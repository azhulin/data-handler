import { Validator } from "../component"
import { Format } from "../enum"
import { ErrorUnexpected, ErrorUnexpectedFormatting } from "../error"

import type { Config, Context, Options, Settings } from "../interface"
import type { Definition, Path, Property } from "../type"

/**
 * The data handler class.
 */
export abstract class Handler extends Validator {

  /**
   * The current data format.
   */
  protected format: Format = Format.base

  /**
   * The data in current format.
   */
  protected data: unknown

  /**
   * Whether the data should be present in "store" format.
   */
  protected store: Property<boolean, Context> = true

  /**
   * Whether the data should be present in "output" format.
   */
  protected output: Property<boolean, Context> = true

  /**
   * Constructor for the Handler object.
   */
  public constructor(config: Config, settings?: Settings) {
    super(config, settings)
    this.store = config.store ?? this.store
    this.output = config.output ?? this.output
  }

  /**
   * {@inheritdoc}
   */
  public async validate(data: unknown, options?: Options): Promise<unknown> {
    return this.inInput(data).toBase(options)
  }

  /**
   * Initializes the handler with data in input format.
   */
  public inInput(data: unknown): this {
    return this.initData(Format.input, data)
  }

  /**
   * Initializes the handler with data in base format.
   */
  public inBase(data: unknown): this {
    return this.initData(Format.base, data)
  }

  /**
   * Initializes the handler with data in store format.
   */
  public inStore(data: unknown): this {
    return this.initData(Format.store, data)
  }

  /**
   * Initializes the handler with data in specified format.
   */
  public initData(format: Format, data: unknown): this {
    this.reset(data)
    this.format = format
    this.data = data
    return this
  }

  /**
   * Returns the data in base format.
   */
  public async toBase(options?: Options): Promise<unknown> {
    return this.formatData(Format.base, options) as Promise<unknown>
  }

  /**
   * Returns the data in store format.
   */
  public async toStore(options?: Options): Promise<unknown> {
    return this.formatData(Format.store, options)
  }

  /**
   * Returns the data in output format.
   */
  public async toOutput(options?: Options): Promise<unknown> {
    return this.formatData(Format.output, options)
  }

  /**
   * Returns data in specified format.
   */
  public async formatData(format: Format, options?: Options): Promise<unknown> {
    if (this.format === format) {
      return this.data
    }
    this.reset(this.data)
    switch (this.format + format) {
      case Format.input + Format.base:
        this.data = await this.formatInputToBase(this.data, options)
        break

      case Format.store + Format.base:
        this.data = await this.formatStoreToBase(this.data, options)
        break

      case Format.base + Format.store:
        return this.formatBaseToStore(this.data, options)

      case Format.base + Format.output:
        return this.formatBaseToOutput(this.data, options)

      default:
        throw new ErrorUnexpected("Invalid data format conversion.")
    }
    this.format = format
    return this.data
  }

  /**
   * Returns the current data format.
   */
  public getFormat(): Format {
    return this.format
  }

  /**
   * Returns the data in current format.
   */
  public getData(): unknown {
    return this.data
  }

  /**
   * Returns the data in base format from data in input format.
   */
  protected async formatInputToBase(data: unknown, options?: Options): Promise<unknown> {
    return super.validate(data, options)
  }

  /**
   * Returns store data from base data.
   */
  protected async formatBaseToStore(data: unknown, options?: Options): Promise<unknown> {
    const context = await this.getContext(options)
    if (!await this.isStorable(context)) {
      return undefined
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidBaseData(data)) {
      return this.baseToStore(data, context)
    }
    throw new ErrorUnexpectedFormatting(this.path, this.id, Format.base, Format.store, data)
  }

  /**
   * Returns output data from base data.
   */
  protected async formatBaseToOutput(data: unknown, options?: Options): Promise<unknown> {
    const context = await this.getContext(options)
    if (!await this.isOutputable(context)) {
      return undefined
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidBaseData(data)) {
      return this.baseToOutput(data, context)
    }
    throw new ErrorUnexpectedFormatting(this.path, this.id, Format.base, Format.output, data)
  }

  /**
   * Returns base data from store data.
   */
  protected async formatStoreToBase(data: unknown, options?: Options): Promise<unknown> {
    const context = await this.getContext(options)
    if (!await this.isStorable(context) || this.isOmitted(data)) {
      data = await this.getDefault(context, "read")
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidStoreData(data)) {
      return this.storeToBase(data, context)
    }
    throw new ErrorUnexpectedFormatting(this.path, this.id, Format.store, Format.base, data)
  }

  /**
   * Determines whether the data is in expected input format.
   */
  protected isValidInputData(data: unknown): boolean {
    return this.isValid(data)
  }

  /**
   * Determines whether the data is in expected base format.
   */
  protected isValidBaseData(data: unknown): boolean {
    return this.isValidInputData(data)
  }

  /**
   * Determines whether the data is in expected store format.
   */
  protected isValidStoreData(data: unknown): boolean {
    return this.isValidBaseData(data)
  }

  /**
   * Converts data in input format to data in base format.
   */
  protected async inputToBase(data: unknown, context: Context): Promise<unknown> {
    return super.process(data, context)
  }
  protected process = this.inputToBase

  /**
   * Converts data in base format to data in store format.
   */
  protected async baseToStore(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Converts data in base format to data in output format.
   */
  protected async baseToOutput(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Converts data in store format to data in base format.
   */
  protected async storeToBase(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Returns "store" flag value.
   */
  protected async isStorable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>("store", context)
  }

  /**
   * Returns "output" flag value.
   */
  protected async isOutputable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>("output", context)
  }

  /**
   * Returns the data handler for specified data definition.
   */
  protected initHandler(definition: Definition, path: Path = []): Handler {
    const { Handler, config } = "config" in definition ? definition : { ...definition, config: {} }
    const { source, result, storage, warnings } = this
    return new Handler(config, { path, source, result, storage, warnings })
  }

}
