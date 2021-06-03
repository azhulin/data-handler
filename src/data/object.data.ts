import * as Data from ".."

export type Config = Data.Config & {
  schema: Data.Schema
  reduce?: boolean
}

/**
 * The object data handler class.
 */
export class Handler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "object" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Object" }

  /**
   * The schema.
   */
  protected schema: Data.Schema = {}

  /**
   * The prepared schema.
   */
  protected get preparedSchema(): Data.Schema {
    return this._preparedSchema ?? (this._preparedSchema = this.prepareSchema())
  }
  private _preparedSchema: Data.Schema

  /**
   * Whether to use default value, if all schema keys are optional and equal to Null.
   */
  protected reduce: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as Config
    this.schema = config.schema ?? this.schema
    this.reduce = config.reduce ?? this.reduce
  }

  /**
   * Prepares the schema.
   */
  protected prepareSchema(): Data.Schema {
    return this.schema
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.isObject(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown> | null> {
    Object.keys(data).filter(key => !(key in this.preparedSchema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    let result = await this.convert("toBase", data, context)
    if (this.reduce && Object.values(result).every(value => null === value)
        && !await this.isRequired(context)) {
      result = await this.getDefault(context) as Record<string, unknown> | null
    }
    return super.inputToBase(result, context) as Promise<Record<string, unknown> | null>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>> {
    const result = await this.convert("toStore", data, context)
    return super.baseToStore(result, context) as Promise<Record<string, unknown>>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>> {
    const result = await this.convert("toOutput", data, context)
    return super.baseToOutput(result, context) as Promise<Record<string, unknown>>
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context) as Promise<Record<string, unknown>>
  }

  /**
   * Performs format conversion.
   */
  protected async convert(method: "toBase" | "toStore" | "toOutput", data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>> {
    const result: Record<string, unknown> = {}
    this.result = Data.set(this.result, this.path, result)
    for (const key of Object.keys(this.preparedSchema)) {
      const value = await this.getHandler(key, data[key])[method](context)
      undefined !== value && (result[key] = value)
    }
    return result
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string, data: unknown): Data.Handler {
    return this.initHandler(this.preparedSchema[key], [...this.path, key])
      .initData(this.format, data)
  }

}

export function conf(config: Config) { return { ...config, Handler } }
export function init(config: Config) { return new Handler({ config }) }
