import { Constraint } from "../component"
import { Mode } from "../enum"
import {
  ErrorConstraint, ErrorExpected, ErrorEmpty, ErrorIgnored,
  ErrorRequired, ErrorType, ErrorUnexpected,
} from "../error"
import { extract, pathResolve } from "../util"

import type { Config, Context, Default, Options, Settings } from "../interface"
import type { FieldRelative, Path, Processor, Property } from "../type"

/**
 * The data validator class.
 */
export abstract class Validator {

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
   * The label of the data handler.
   */
  public get label(): string { return this.name }

  /**
   * The data preparer library.
   *
   * The data preparer library contains predefined data preparers specific to
   * this data handler. The data preparers defined in the library can be used in
   * data handler configuration and in `preparers` property of the data handler.
   * See {@link Validator#preparers}, {@link Config#preparers}
   */
  public static preparer: Processor.Library<unknown> = {}

  /**
   * A map of available data processors.
   */
  public static processor: Processor.Library<any> = {}

  /**
   * A map of available data constraints.
   */
  public static constraint: Constraint.Library<any> = {}

  /**
   * The data preparers.
   *
   * The data preparers is a data processor list for preparing the data. The
   * data preparers (from this property with appended data preparers from the
   * data handler configuration, if any) are ran during validation after the
   * data value is ensured (not `undefined` and not `null`), and before the data
   * value is validated. So the data preparers is a place to cast a data value
   * to the desired type. For example, if expected input for a numeric data
   * handler is a string, the data preparer can be used to convert a string
   * representation of a number into a number.
   * Additional data preparers can be added to the run in the data handler
   * configuration. They will run after this data preparers.
   */
  protected preparers: Processor.List<unknown> = []

  /**
   * An array of data preprocessors.
   */
  protected preprocessors: Processor.List<any> = []

  /**
   * An array of data constraints.
   */
  protected constraints: Constraint.List<any> = []

  /**
   * An array of data postprocessors.
   */
  protected postprocessors: Processor.List<any> = []

  /**
   * The data default value behaviors.
   *
   * Some or all data default value behaviors can be overridden in the data
   * handler configuration.
   * See {@link Config#default}.
   */
  protected default: Default = {

    /**
     * This data default value behavior is used as a fallback for other
     * behaviors.
     */
    value: null,

    /**
     * This data default value behavior falls back to the `value` behavior.
     */
    create: (context: Context) => this.getProperty(this.default.value, context),

    /**
     * This data default value behavior retrieves the value from the original
     * data, and if the retrieved value is undefined or empty, it falls back to
     * the `value` behavior.
     */
    update: (context: Context) => context.original() ?? this.default.value,

    /**
     * This data default value behavior falls back to the `create` behavior.
     */
    nulled: (context: Context) => this.getProperty(this.default.create, context),

    /**
     * This data default value behavior falls back to the `value` behavior.
     */
    read: (context: Context) => this.getProperty(this.default.value, context),

  }

  /**
   * The `input` data property.
   *
   * The `input` data property determines whether to accept or ignore the data
   * value from the source data when validating data. If the computed value of
   * the `input` data property is:
   * - `true`: the data value is taken from the source data;
   * - `false`: the data value is taken from the `create` or `update` data
   *   default value behavior depending on the data mode. If the data value is
   *   provided in source data, the warning about the ignored data value is
   *   generated.
   * By default, the `input` data property is `true`. It can be overridden in
   * the data handler configuration.
   * See {@link Default}, {@link Config#input}, {@link Mode}.
   */
  protected input: Property<boolean, Context> = true

  /**
   * The `require` data property.
   *
   * The `require` data property determines whether the data value is required
   * when validating data. If the computed value of the `require` data property
   * is `true`, the data value is required, otherwise it is optional.
   * If the computed value of the `require` data property is:
   * - `true`, in `create` data mode, data value is not provided (`undefined`):
   *   the data required error is thrown;
   * - `true`, in `create` data mode, data value is `null`: the data empty error
   *   is thrown;
   * - `true`, in `update` data mode, data value is not provided (`undefined`):
   *   the data value is taken from the `update` data default value behavior
   *   (original data value by default), and if the obtained value is
   *   `undefined` or `null`, the data required error is thrown;
   * - `true`, in `update` data mode, data value is `null`: the data empty error
   *   is thrown;
   * - `false`, in `create` data mode, data value is not provided (`undefined`):
   *   the data value is taken from the `create` data default value behavior
   *   (`null` by default);
   * - `false`, in `create` data mode, data value is `null`: the data value is
   *   taken from the `nulled` data default value behavior (`null` by default);
   * - `false`, in `update` data mode, data value is not provided (`undefined`):
   *   the data value is taken from the `update` data default value behavior
   *   (original data value by default);
   * - `false`, in `update` data mode, data value is `null`: the data value is
   *   taken from the `nulled` data default value behavior (`null` by default).
   * By default, the `require` data property is `true`. It can be overridden in
   * the data handler configuration.
   * See {@link Default}, {@link Config}, {@link Mode}.
   */
  protected require: Property<boolean, Context> = true

  /**
   * Custom preparers, preprocessors, constraints, postprocessors.
   */
  protected custom: {
    preparers?: Processor.List<unknown>
    preprocessors?: Processor.List<any>
    constraints?: Constraint.List<any>
    postprocessors?: Processor.List<any>
  } = {}

  /**
   * The data path.
   *
   * The path of this data handler's data in the data tree. The data path can be
   * accessed from the data context.
   * See {@link Context}, {@link Settings}.
   */
  public readonly path: Path = []

  /**
   * The data warnings.
   *
   * The data warnings is an array shared among all the data handlers during the
   * data formatting run that can be accessed from the data context. The data
   * warnings array contains non-critical data errors collected during the data
   * formatting run. The data warnings can be used to notify the user of minor
   * problems. For example, when validating data, the user provided a value for
   * the data that is configured as not inputable, and in this case the user can
   * be warned that the provided data value was ignored.
   * See {@link Context}, {@link Settings}.
   */
  public warnings: ErrorExpected[] = []

  /**
   * The source data.
   *
   * The source data is a value shared among all the data handlers during the
   * data formatting run that can be accessed from the data context. The source
   * data is a data the formatting is performed from. For example, when
   * validating data, the formatting is performed from the `input` data format
   * into the `base` data format, and in this case the source data is a data in
   * the `input` data format.
   * See {@link Context}, {@link Settings}.
   */
  protected source: unknown

  /**
   * The result data.
   *
   * The result data is a value shared among all the data handlers during the
   * data formatting run that can be accessed from the data context. The result
   * data is a data the formatting is performed to. For example, when validating
   * data, the formatting is performed from the `input` data format into the
   * `base` data format, and in this case the result data is a data in the
   * `base` data format.
   * See {@link Context}, {@link Settings}.
   */
  protected result: unknown

  /**
   * The data storage.
   *
   * The data storage is an object shared among all the data handlers during the
   * data formatting run that can be accessed from the data context. It can be
   * used to pass some custom data from one data handler to another. For
   * example, if several data handlers need to load some independent external
   * data, only the first one can load the data and put it into the data storage
   * under some agreed key and the other ones can retrive this data from the
   * data storage.
   * See {@link Context}, {@link Settings}.
   */
  protected storage: Record<string, unknown> = {}

  /**
   * Constructor for the Validator object.
   */
  public constructor(config: Config, settings?: Settings) {
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
    const { path, warnings, source, result, storage } = settings ?? {}
    this.path = path ?? this.path
    this.warnings = warnings ?? this.warnings
    this.source = source
    this.result = result
    this.storage = storage ?? this.storage
  }

  /**
   * Resets the handler state.
   */
  protected reset(data: unknown): void {
    if (this.isRoot()) {
      this.warnings = []
      this.source = data
      this.result = undefined
      this.storage = {}
    }
  }

  /**
   * Returns validated data.
   */
  public async validate(data: unknown, options?: Options): Promise<unknown> {
    this.reset(data)
    const context = await this.getContext(options)
    if (!await this.isInputable(context)) {
      !this.isOmitted(data) && this.inSource()
        && this.warnings.push(new ErrorIgnored(this.path))
      data = await this.getDefault(context)
    }
    else if (this.isOmitted(data)) {
      const required = await this.isRequired(context)
      if (required && !context.update) {
        throw new ErrorRequired(this)
      }
      data = await this.getDefault(context)
      if (required && this.isEmpty(data)) {
        throw new ErrorRequired(this)
      }
    }
    else if (this.isNull(data)) {
      if (await this.isRequired(context)) {
        throw new ErrorEmpty(this)
      }
      data = await this.getDefault(context, "nulled")
    }
    if (!this.isEmpty(data)) {
      data = await this.run("preparers", data, context)
      if (!this.isValid(data)) {
        throw new ErrorType(this)
      }
      data = this.handle(data, context)
    }
    return data
  }

  /**
   * Returns the context.
   */
  protected async getContext(options: Options = {}): Promise<Context> {
    const { mode = Mode.create, data } = options
    const update = Mode.update === mode
    if (update && !data) {
      throw new ErrorUnexpected(`Context data is required in ${mode} mode.`)
    }
    return {
      ...options,
      mode,
      create: !update,
      update,
      handler: this,
      path: this.path,
      warnings: this.warnings,
      source: <T = unknown>(field?: FieldRelative): T =>
        extract(this.source, pathResolve(this.path, field)) as T,
      result: <T = unknown>(field?: FieldRelative): T =>
        extract(this.result, pathResolve(this.path, field)) as T,
      original: <T = unknown>(field?: FieldRelative): T =>
        extract(data, pathResolve(this.path, field)) as T,
      storage: <T = unknown>(key: string, value?: T): T =>
        undefined !== value ? this.storage[key] = value : this.storage[key] as T,
    }
  }

  /**
   * Determines whether the data is valid.
   */
  protected isValid(data: unknown): boolean {
    return true
  }

  /**
   * Handles the data.
   */
  protected async handle(data: unknown, context: Context): Promise<unknown> {
    data = await this.run("preprocessors", data, context)
    await this.checkConstraints(data, context)
    return this.run("postprocessors", data, context)
  }

  /**
   * Runs processors on the data.
   */
  protected async run(type: "preparers" | "preprocessors" | "postprocessors", data: unknown, context: Context): Promise<unknown> {
    const processors = []
    for (const item of [...this[type], ...this.custom[type] ?? []]) {
      processors.push(...Array.isArray(item) ? item[0](context) : [item])
    }
    for (const processor of processors) {
      data = await processor(data, context)
    }
    return data
  }

  /**
   * Checks data constraints.
   */
  protected async checkConstraints(data: unknown, context: Context): Promise<void> {
    const constraints = []
    for (const item of [...this.constraints, ...this.custom.constraints ?? []]) {
      constraints.push(...Array.isArray(item) ? item[0](context) : [item])
    }
    for (const { id, func, skip } of constraints) {
      const { update, original } = context
      // Allows to skip constraint validation on update with unchanged value.
      if (skip && update && data === original()) {
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
   * Determines whether the data is empty.
   */
  protected isEmpty(data: unknown): boolean {
    return this.isOmitted(data) || this.isNull(data)
  }

  /**
   * Determines whether the data is omitted.
   */
  protected isOmitted(data: unknown): boolean {
    return undefined === data
  }

  /**
   * Determines whether the data is null.
   */
  protected isNull(data: unknown): boolean {
    return null === data
  }

  /**
   * Returns "input" flag value.
   */
  protected async isInputable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>(this.input, context)
  }

  /**
   * Returns "require" flag value.
   */
  protected async isRequired(context: Context): Promise<boolean> {
    return this.getProperty<boolean>(this.require, context)
  }

  /**
   * Returns the default value based on behavior.
   */
  protected async getDefault(context: Context, behavior?: keyof Default): Promise<unknown> {
    return this.getProperty(this.default[behavior ?? context.mode], context)
  }

  /**
   * Returns data handler dynamic context property value.
   */
  protected async getProperty<P = unknown, C = Context>(property: Property<P, C>, context: C): Promise<P> {
    return "function" === typeof property
      ? (property as Property.Dynamic<P, C>)(context)
      : property as Property.Static<P>
  }

}
