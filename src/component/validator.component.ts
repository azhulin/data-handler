import { Operation } from "../enum"
import {
  ErrorConstraint, ErrorEmpty, ErrorIgnored, ErrorRequired, ErrorType, ErrorUnexpected,
} from "../error"
import { extract, pathResolve } from "../util"

import type { BaseContext, Context, Settings } from "../interface"
import type { Constraint, Default, Definition, Path, Preparer, Processor, Property } from "../type"

/**
 * The data validator class.
 */
export abstract class Validator<T extends any = any> {

  /**
   * The ID of the data type.
   */
  public abstract get id(): string

  /**
   * The name of the data type.
   */
  public abstract get name(): string

  /**
   * The description of the data type.
   */
  public get description(): string { return "" }

  /**
   * A map of available data preparers.
   */
  public static preparer: Preparer.Library = {}

  /**
   * A map of available data processors.
   */
  public static processor: Processor.Library = {}

  /**
   * A map of available data constraints.
   */
  public static constraint: Constraint.Library = {}

  /**
   * The default data.
   */
  protected default: Default<T> = {
    value: null as T,
    read: context => this.getValue(this.default.value, context),
    create: context => this.getValue(this.default.value, context),
    update: context => (context.original() ?? this.default.value) as T,
    integrate: context => this.getValue(this.default.update, context),
    nulled: context => this.getValue(this.default.create, context),
  }

  /**
   * Whether to accept the data from input.
   */
  protected input: Property<boolean, Context> = true

  /**
   * Whether the data is required.
   */
  protected require: Property<boolean, Context> = true

  /**
   * An array of data preparers.
   */
  protected preparers: Preparer<T>[] = []

  /**
   * An array of data preprocessors.
   */
  protected preprocessors: Processor<NonNullable<T>>[] = []

  /**
   * An array of data constraints.
   */
  protected constraints: Constraint.List<NonNullable<T>> = []

  /**
   * An array of data postprocessors.
   */
  protected postprocessors: Processor<NonNullable<T>>[] = []

  /**
   * Custom preparers, preprocessors, constraints, postprocessors.
   */
  protected custom: {
    preparers?: Preparer<T>[]
    preprocessors?: Processor<NonNullable<T>>[]
    constraints?: Constraint.List<NonNullable<T>>
    postprocessors?: Processor<NonNullable<T>>[]
  } = {}

  /**
   * The path of the data in the data tree.
   */
  protected path: Path = []

  /**
   * Source data.
   */
  protected source: unknown

  /**
   * Currently processed data.
   */
  protected result: unknown

  /**
   * Intermediate data storage.
   */
  protected storage: Record<string, unknown> = {}

  /**
   * An array of collected during data handling warnings.
   */
  public warnings: Error[] = []

  /**
   * Constructor for the Handler object.
   */
  public constructor({ config = {}, path, source, result, storage, warnings }: Settings) {
    this.input = config.input ?? this.input
    this.require = config.require ?? this.require
    this.default = { ...this.default, ...config.default }
    this.custom.preparers = [
      ...this.custom.preparers ?? [],
      ...config.preparers ?? [],
    ]
    this.custom.preprocessors = [
      ...this.custom.preprocessors ?? [],
      ...config.preprocessors ?? [],
    ]
    this.custom.constraints = [
      ...this.custom.constraints ?? [],
      ...config.constraints ?? [],
    ]
    this.custom.postprocessors = [
      ...this.custom.postprocessors ?? [],
      ...config.postprocessors ?? [],
    ]
    this.path = path ?? this.path
    this.source = source
    this.result = result
    this.storage = storage ?? this.storage
    this.warnings = warnings ?? this.warnings
  }

  /**
   * Resets the handler state.
   */
  protected reset(data: unknown): void {
    if (this.isRoot()) {
      this.source = data
      this.result = undefined
      this.storage = {}
      this.warnings = []
    }
  }

  /**
   * Returns validated data.
   */
  public async validate(data: unknown, baseContext?: BaseContext): Promise<T> {
    this.reset(data)
    const context = await this.getContext(baseContext)
    if (!await this.isInputable(context)) {
      !this.isOmitted(data) && this.inSource()
        && this.warn(new ErrorIgnored(this.path))
      data = await this.getDefault(context)
    }
    else if (this.isOmitted(data)) {
      const required = await this.isRequired(context)
      if (required && !context.update && !context.integrate) {
        throw new ErrorRequired(this.path)
      }
      data = await this.getDefault(context)
      if (required && this.isEmpty(data)) {
        throw new ErrorRequired(this.path)
      }
    }
    else if (this.isEmpty(data)) {
      if (await this.isRequired(context)) {
        throw new ErrorEmpty(this.path)
      }
      data = await this.getDefault(context, "nulled")
    }
    if (!this.isEmpty(data) && !this.isOmitted(data)) {
      data = await this.prepare(data, context)
      if (!this.isValid(data)) {
        throw new ErrorType(this.path, this)
      }
      data = await this.process(data as NonNullable<T>, context)
    }
    return data as T
  }

  /**
   * Returns the context.
   */
  protected async getContext(context?: BaseContext): Promise<Context> {
    const { create, update, integrate } = Operation
    const { operation = create, data } = context ?? {}
    if ([update, integrate].includes(operation) && !data) {
      throw new ErrorUnexpected(`Context data is required for the ${operation} operation.`)
    }
    return {
      ...context,
      operation,
      create: false,
      update: false,
      integrate: false,
      [operation]: true,
      handler: this,
      path: this.path,
      source: field => extract(this.source, pathResolve(this.path, field)),
      result: field => extract(this.result, pathResolve(this.path, field)),
      original: field => extract(data, pathResolve(this.path, field)),
      storage: (key, value?) =>
        undefined !== value ? this.storage[key] = value : this.storage[key],
    }
  }

  /**
   * Prepares the data.
   */
  protected async prepare(data: unknown, context: Context): Promise<T> {
    for (let preparer of [...this.preparers, ...this.custom.preparers ?? []]) {
      data = await preparer(data, context)
    }
    return data as T
  }

  /**
   * Determines whether the data is valid.
   */
  protected isValid(data: unknown): boolean {
    return true
  }

  /**
   * Processes the data.
   */
  protected async process(data: NonNullable<T>, context: Context): Promise<NonNullable<T>> {
    data = await this.preprocess(data, context)
    await this.checkConstraints(data, context)
    return this.postprocess(data, context)
  }

  /**
   * Runs data preprocessors.
   */
  protected async preprocess(data: NonNullable<T>, context: Context): Promise<NonNullable<T>> {
    return this.run("preprocessors", data, context)
  }

  /**
   * Runs data postprocessors.
   */
  protected async postprocess(data: NonNullable<T>, context: Context): Promise<NonNullable<T>> {
    return this.run("postprocessors", data, context)
  }

  /**
   * Runs processors on the data.
   */
  protected async run(type: "preprocessors" | "postprocessors", data: NonNullable<T>, context: Context): Promise<NonNullable<T>> {
    for (let processor of [...this[type], ...this.custom[type] ?? []]) {
      data = await processor(data, context)
    }
    return data
  }

  /**
   * Checks data constraints.
   */
  protected async checkConstraints(data: NonNullable<T>, context: Context): Promise<void> {
    const constraints = []
    for (const item of [...this.constraints, ...this.custom.constraints ?? []]) {
      constraints.push(..."function" === typeof item ? item(context) : [item])
    }
    for (const [id, func, runOnUpdate = false] of constraints) {
      const { update, original } = context
      // Allows to skip constraint validation on update with unchanged value.
      if (!runOnUpdate && update && data === original()) {
        continue
      }
      const result = await func(data, context)
      if (null !== result) {
        const [message, details] = "string" === typeof result ? [result] : result
        throw new ErrorConstraint(message, this.path, this.id, id, details)
      }
    }
  }

  /**
   * Determines whether the value is present in source data.
   */
  protected inSource(): boolean {
    return undefined !== extract(this.source, this.path)
  }

  /**
   * Determines whether this is a root data handler.
   */
  protected isRoot(): boolean {
    return !this.path.length
  }

  /**
   * Determines whether the data was not provided.
   */
  protected isOmitted(data: unknown): boolean {
    return undefined === data
  }

  /**
   * Determines whether the data is empty.
   */
  protected isEmpty(data: unknown): boolean {
    return null === data
  }

  /**
   * Returns "input" flag value.
   */
  protected async isInputable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>("input", context)
  }

  /**
   * Returns "require" flag value.
   */
  protected async isRequired(context: Context): Promise<boolean> {
    return this.getProperty<boolean>("require", context)
  }

  /**
   * Returns the default value based on behavior.
   */
  protected async getDefault(context: Context, behavior?: keyof Default<T>): Promise<T> {
    const property = this.default[behavior ?? context.operation]
    return this.getValue(property, context)
  }

  /**
   * Returns data handler dynamic context property value.
   */
  protected async getProperty<P = unknown>(key: string, context: Context): Promise<P> {
    return this.getValue<P>((this as any)[key], context)
  }

  /**
   * Returns dynamic context property value.
   */
  protected async getValue<P = unknown, C = Context>(property: Property<P, C>, context: C): Promise<P> {
    return "function" === typeof property
      ? (property as Property.Dynamic<P, C>)(context)
      : property as Property.Static<P>
  }

  /**
   * Returns the data handler for specified data definition.
   */
  protected initHandler(definition: Definition, path: Path): Validator {
    const [handler, config] = Array.isArray(definition) ? definition : [definition, {}]
    const { source, result, storage, warnings } = this
    return new handler({ config, path, source, result, storage, warnings })
  }

  /**
   * Adds a warning.
   */
  protected warn(error: Error): void {
    this.warnings.push(error)
  }

}
