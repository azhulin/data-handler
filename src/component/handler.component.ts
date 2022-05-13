import { Validator } from "../component"
import { Format } from "../enum"
import { ErrorUnexpected, ErrorUnexpectedFormatting } from "../error"

import type { Context, Definition, Options } from "../interface"
import type { Path, Property } from "../type"

/**
 * The data handler class.
 *
 * The base data handler class containing the data formatting functionality.
 */
export abstract class Handler extends Validator {

  /**
   * The current data format.
   */
  protected format: Format = Format.base

  /**
   * The data in current data format.
   */
  protected data: unknown

  /**
   * The `store` data property.
   *
   * The `store` data property determines whether the data value is storable.
   * That is, the data value must be passed to, and accepted from the `store`
   * data format.
   * When formatting the data from the `base` data format into the `store` data
   * format (storing), and the computed value of the `store` data property is:
   * - `true`: the data value is passed to the `store` data format;
   * - `false`: the data value is not passed to the `store` data format.
   * When formatting the data from the `store` data format into the `base` data
   * format (reading), and the computed value of the `store` data property is:
   * - `true`: the data value is accepted from the `store` data format;
   * - `false`: the data value is taken from the `read` data default value
   *   behavior (`null` by default).
   * By default, the `store` data property is `true`. It can be overridden in
   * the data handler configuration.
   *
   * @see Config#store
   * @see Default
   */
  protected store: Property<boolean> = true

  /**
   * The `output` data property.
   *
   * The `output` data property determines whether the data value is
   * outputable. That is, the data value must be passed to the `output` data
   * format.
   * When formatting the data from the `base` data format into the `output` data
   * format (outputting), and the computed value of the `output` data property
   * is:
   * - `true`: the data value is passed to the `output` data format;
   * - `false`: the data value is not passed to the `output` data format.
   * By default, the `output` data property is `true`. It can be overridden in
   * the data handler configuration.
   *
   * @see Config#output
   * @see Default
   */
  protected output: Property<boolean> = true

  /**
   * {@inheritdoc}
   */
  public async validate(data: unknown, options?: Options): Promise<unknown> {
    return this.inInput(data).toBase(options)
  }

  /**
   * Initializes the data handler with the provided data in `input` data format.
   *
   * @param data - The data to initialize the data handler with.
   *
   * @returns This data handler.
   *
   * @see Format
   */
  public inInput(data: unknown): this {
    return this.initData(Format.input, data)
  }

  /**
   * Initializes the data handler with the provided data in `base` data format.
   *
   * @param data - The data to initialize the data handler with.
   *
   * @returns This data handler.
   *
   * @see Format
   */
  public inBase(data: unknown): this {
    return this.initData(Format.base, data)
  }

  /**
   * Initializes the data handler with the provided data in `store` data format.
   *
   * @param data - The data to initialize the data handler with.
   *
   * @returns This data handler.
   *
   * @see Format
   */
  public inStore(data: unknown): this {
    return this.initData(Format.store, data)
  }

  /**
   * Initializes the data handler with the provided data in specified data
   * format.
   *
   * @param format - The data format to initalize the data handler in.
   * @param data - The data to initialize the data handler with.
   *
   * @returns This data handler.
   */
  public initData(format: Format, data: unknown): this {
    this.reset(data)
    this.format = format
    this.data = data
    return this
  }

  /**
   * Returns the data formatted into the `base` data format.
   *
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted into the `base` data
   *   format.
   *
   * @see Format
   */
  public async toBase(options?: Options): Promise<unknown> {
    return this.formatData(Format.base, options)
  }

  /**
   * Returns the data formatted into the `store` data format.
   *
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted into the `store`
   *   data format.
   *
   * @see Format
   */
  public async toStore(options?: Options): Promise<unknown> {
    return this.formatData(Format.store, options)
  }

  /**
   * Returns the data formatted into the `output` data format.
   *
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted into the `output`
   *   data format.
   *
   * @see Format
   */
  public async toOutput(options?: Options): Promise<unknown> {
    return this.formatData(Format.output, options)
  }

  /**
   * Returns the data formatted into the specified data format.
   *
   * @param format - The data format to format the data into.
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted into the specified
   *   data format.
   */
  public async formatData(format: Format, options?: Options): Promise<unknown> {
    if (this.format === format) {
      return this.data
    }
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
        throw new ErrorUnexpected("Invalid data format transition.")
    }
    this.format = format
    return this.data
  }

  /**
   * Returns the data formatted from the `input` data format into the `base`
   * data format (data validation).
   *
   * @param data - The data to format.
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted from the `input`
   * data format into the `base` data format.
   *
   * @see Validator#validate
   */
  protected async formatInputToBase(data: unknown, options?: Options): Promise<unknown> {
    return super.validate(data, options)
  }

  /**
   * Returns the data formatted from the `base` data format into the `store`
   * data format (data storing).
   *
   * The data storing process can be divided into the following steps:
   *   1. Ensuring the data:
   *   - handling the storable data property (see `isStorable` method).
   *   2. Validating the type of the data (see `isValidTypeBase` method).
   *   3. Processing the data (see `baseToStore` method).
   *
   * @param data - The data to format.
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted from the `base`
   * data format into the `store` data format.
   *
   * @see Handler#isStorable
   * @see Handler#isValidTypeBase
   * @see Handler#baseToStore
   */
  protected async formatBaseToStore(data: unknown, options?: Options): Promise<unknown> {
    const context = this.getContext(options)
    if (!await this.isStorable(context)) {
      data = undefined
    }
    if (!this.isEmpty(data)) {
      if (!this.isValidTypeBase(data)) {
        throw new ErrorUnexpectedFormatting(this, Format.base, Format.store, data)
      }
      data = this.baseToStore(data, context)
    }
    return data
  }

  /**
   * Returns the data formatted from the `base` data format into the `output`
   * data format (data outputting).
   *
   * The data outputting process can be divided into the following steps:
   *   1. Ensuring the data:
   *   - handling the outputable data property (see `isOutputable` method).
   *   2. Validating the type of the data (see `isValidTypeBase` method).
   *   3. Processing the data (see `baseToOutput` method).
   *
   * @param data - The data to format.
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted from the `base`
   * data format into the `output` data format.
   *
   * @see Handler#isOutputable
   * @see Handler#isValidTypeBase
   * @see Handler#baseToOutput
   */
  protected async formatBaseToOutput(data: unknown, options?: Options): Promise<unknown> {
    const context = this.getContext(options)
    if (!await this.isOutputable(context)) {
      data = undefined
    }
    if (!this.isEmpty(data)) {
      if (!this.isValidTypeBase(data)) {
        throw new ErrorUnexpectedFormatting(this, Format.base, Format.output, data)
      }
      data = this.baseToOutput(data, context)
    }
    return data
  }

  /**
   * Returns the data formatted from the `store` data format into the `base`
   * data format (data reading).
   *
   * The data reading process can be divided into the following steps:
   *   1. Ensuring the data:
   *   - handling the storable data property (see `isStorable` method).
   *   2. Validating the type of the data (see `isValidTypeStore` method).
   *   3. Processing the data (see `storeToBase` method).
   *
   * @param data - The data to format.
   * @param options - The data options.
   *
   * @returns A promise that resolves with a data formatted from the `store`
   * data format into the `base` data format.
   *
   * @see Handler#isStorable
   * @see Handler#isValidTypeStore
   * @see Handler#baseToOutput
   */
  protected async formatStoreToBase(data: unknown, options?: Options): Promise<unknown> {
    const context = this.getContext(options)
    if (!await this.isStorable(context) || this.isOmitted(data)) {
      data = await this.getDefault(context, "read")
    }
    if (!this.isEmpty(data)) {
      if (!this.isValidTypeStore(data)) {
        throw new ErrorUnexpectedFormatting(this, Format.store, Format.base, data)
      }
      data = this.storeToBase(data, context)
    }
    return data
  }

  /**
   * Determines whether the provided data has an expected data type for the
   * `input` data format.
   *
   * @param data - The data to check.
   *
   * @returns `true`, if the provided data has an expected data type for the
   *   `input` data format, and `false` otherwise.
   */
  protected isValidTypeInput(data: unknown): boolean {
    return this.isValidType(data)
  }

  /**
   * Determines whether the provided data has an expected data type for the
   * `base` data format.
   *
   * @param data - The data to check.
   *
   * @returns `true`, if the provided data has an expected data type for the
   *   `base` data format, and `false` otherwise.
   */
  protected isValidTypeBase(data: unknown): boolean {
    return this.isValidTypeInput(data)
  }

  /**
   * Determines whether the provided data has an expected data type for the
   * `store` data format.
   *
   * @param data - The data to check.
   *
   * @returns `true`, if the provided data has an expected data type for the
   *   `store` data format, and `false` otherwise.
   */
  protected isValidTypeStore(data: unknown): boolean {
    return this.isValidTypeBase(data)
  }

  /**
   * Converts the ensured data of the expected data type from the `input` data
   * format into the `base` data format.
   *
   * @param data - The data to convert.
   * @param context - The data context.
   *
   * @returns A promise that resolves with a converted data.
   */
  protected async inputToBase(data: unknown, context: Context): Promise<unknown> {
    return super.handle(data, context)
  }
  protected handle = this.inputToBase

  /**
   * Converts the ensured data of the expected data type from the `base` data
   * format into the `store` data format.
   *
   * @param data - The data to convert.
   * @param context - The data context.
   *
   * @returns A promise that resolves with a converted data.
   */
  protected async baseToStore(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Converts the ensured data of the expected data type from the `base` data
   * format into the `output` data format.
   *
   * @param data - The data to convert.
   * @param context - The data context.
   *
   * @returns A promise that resolves with a converted data.
   */
  protected async baseToOutput(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Converts the ensured data of the expected data type from the `store` data
   * format into the `base` data format.
   *
   * @param data - The data to convert.
   * @param context - The data context.
   *
   * @returns A promise that resolves with a converted data.
   */
  protected async storeToBase(data: unknown, context: Context): Promise<unknown> {
    return data
  }

  /**
   * Determines whether the data is storable.
   *
   * @param context - The data context.
   *
   * @returns A promise that resolves with `true`, if the data is storable, and
   *   with `false` otherwise.
   *
   * @see Handler#store
   */
  protected async isStorable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>(this.config.store ?? this.store, context)
  }

  /**
   * Determines whether the data is outputable.
   *
   * @param context - The data context.
   *
   * @returns A promise that resolves with `true`, if the data is outputable,
   *   and with `false` otherwise.
   *
   * @see Handler#output
   */
  protected async isOutputable(context: Context): Promise<boolean> {
    return this.getProperty<boolean>(this.config.output ?? this.output, context)
  }

  /**
   * Returns the data handler instance initialized from the specified data
   * definition.
   *
   * @param definition - The data definition to initialize the data handler
   *   from.
   * @param path - The data path the data handler to be initialized for.
   *
   * @returns A data handler instance.
   */
  protected initHandler(definition: Definition, path: Path = []): Handler {
    const { Handler, config } = "config" in definition ? definition : { ...definition, config: {} }
    const { warnings, storage, source, result } = this
    return new Handler(config, { path, warnings, storage, source, result })
  }

}
