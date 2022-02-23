import * as Data from ".."

/**
 * The object data handler class.
 */
class ObjectHandler extends Data.Handler {

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
  private _preparedSchema?: Data.Schema

  /**
   * Whether to use default value, if all schema keys are optional and equal to Null.
   */
  protected reduce: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as $Object.Config
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
  protected async inputToBase(data: Record<string, any>, context: Data.Context): Promise<Record<string, any>> {
    Object.keys(data).filter(key => !(key in this.preparedSchema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    let result = await this.convert("toBase", data, context)
    if (this.reduce && Object.values(result!).every(value => null === value)
        && !await this.isRequired(context)) {
      result = await this.getDefault(context) as Record<string, any>
    }
    return super.inputToBase(result, context) as Promise<Record<string, any>>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: Record<string, any>, context: Data.Context): Promise<any> {
    const result = await this.convert("toStore", data, context)
    return super.baseToStore(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: Record<string, any>, context: Data.Context): Promise<any> {
    const result = await this.convert("toOutput", data, context)
    return super.baseToOutput(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: Record<string, any>, context: Data.Context): Promise<Record<string, any>> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context) as Promise<Record<string, any>>
  }

  /**
   * Performs format conversion.
   */
  protected async convert(method: "toBase" | "toStore" | "toOutput", data: Record<string, any>, context: Data.Context): Promise<Record<string, any>> {
    const result: Record<string, any> = {}
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

export namespace $Object {
  export type Config<T extends Record<string, any> = Record<string, any>> = Data.Config<T> & {
    schema: Data.Schema
    reduce?: boolean
  }
  export const Handler = ObjectHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return { Handler, config } }
  export function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return new Handler({ config }) }
}
