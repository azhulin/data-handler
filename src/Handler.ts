import type {
  BaseContext, Config, Context, Definition, Path, Property, Settings,
} from "./type"
import { Handler as BaseHandler } from "@azhulin/data-validator"
import * as Error from "./error"
import Format from "./Format"

/**
 * The data handler class.
 */
export default abstract class Handler extends BaseHandler {

  /**
   * The current data format.
   */
  protected format: Format

  /**
   * The data in current format.
   */
  protected data: unknown

  /**
   * [$] Whether the data should be present in "store" format.
   */
  protected store: Property<boolean, Context> = true

  /**
   * [#] Whether the data should be present in "output" format.
   */
  protected output: Property<boolean, Context> = true

  /**
   * {@inheritdoc}
   */
  protected static modifiers: Record<string, (config: Config) => void> = {
    ...BaseHandler.modifiers,
    "$": config => config.store = false,
    "#": config => config.output = false,
  }

  /**
   * Constructor for the Handler object.
   */
  public constructor(settings: Settings) {
    super(settings)
    const config = settings.config ?? {}
    this.store = config.store ?? this.store
    this.output = config.output ?? this.output
  }

  /**
   * {@inheritdoc}
   */
  public async validate(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    return this.inInput(data).toBase(baseContext)
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
    this.format = format
    this.data = data
    return this
  }

  /**
   * Returns the data in base format.
   */
  public async toBase(baseContext?: BaseContext): Promise<unknown> {
    return this.formatData(Format.base, baseContext)
  }

  /**
   * Returns the data in store format.
   */
  public async toStore(baseContext?: BaseContext): Promise<unknown> {
    return this.formatData(Format.store, baseContext)
  }

  /**
   * Returns the data in output format.
   */
  public async toOutput(baseContext?: BaseContext): Promise<unknown> {
    return this.formatData(Format.output, baseContext)
  }

  /**
   * Returns data in specified format.
   */
  public async formatData(format: Format, baseContext?: BaseContext): Promise<unknown> {
    if (this.format === format) {
      return this.data
    }
    switch (this.format + format) {
      case Format.input + Format.base:
        this.data = await this.formatInputToBase(this.data, baseContext)
        break

      case Format.base + Format.store:
        this.data = await this.formatBaseToStore(this.data, baseContext)
        break

      case Format.base + Format.output:
        return this.formatBaseToOutput(this.data, baseContext)

      case Format.store + Format.base:
        this.data = await this.formatStoreToBase(this.data, baseContext)
        break

      default:
        throw new Error.Internal("Invalid data format conversion.")
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
  protected async formatInputToBase(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    return super.validate(data, baseContext)
  }

  /**
   * Returns store data from base data.
   */
  protected async formatBaseToStore(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    const context = await this.getContext(baseContext)
    if (!await this.isStorable(context)) {
      return undefined
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidBaseData(data)) {
      return this.baseToStore(data, context)
    }
    throw new Error.InternalFormat(this.path, this.id, Format.base, Format.store, data)
  }

  /**
   * Returns output data from base data.
   */
  protected async formatBaseToOutput(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    const context = await this.getContext(baseContext)
    if (!await this.isOutputable(context)) {
      return undefined
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidBaseData(data)) {
      return this.baseToOutput(data, context)
    }
    throw new Error.InternalFormat(this.path, this.id, Format.base, Format.output, data)
  }

  /**
   * Returns base data from store data.
   */
  protected async formatStoreToBase(data: unknown, baseContext?: BaseContext): Promise<unknown> {
    const context = await this.getContext(baseContext)
    if (!await this.isStorable(context) || this.isOmitted(data)) {
      data = await this.getDefault(context)
    }
    if (this.isOmitted(data) || this.isEmpty(data)) {
      return data
    }
    if (this.isValidStoreData(data)) {
      return this.storeToBase(data, context)
    }
    throw new Error.InternalFormat(this.path, this.id, Format.store, Format.base, data)
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
    return this.getProperty<boolean, Context>("store", context)
  }

  /**
   * Returns "output" flag value.
   */
  protected async isOutputable(context: Context): Promise<boolean> {
    return this.getProperty<boolean, Context>("output", context)
  }

  /**
   * {@inheritdoc}
   */
  protected initHandler(definition: string | Definition, path: Path): Handler {
    return super.initHandler(definition, path) as Handler
  }

}
