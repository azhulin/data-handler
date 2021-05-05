import * as Data from ".."

export type Config = Data.Config & {
  schema?: Data.Schema
  reduce?: boolean
}
type Obj = Record<string, unknown>

/**
 * The object data handler class.
 */
export default class ObjectHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public id: string = "object"

  /**
   * {@inheritdoc}
   */
  public name: string = "Object"

  /**
   * The raw schema.
   */
  protected schemaRaw: Data.Schema = {}

  /**
   * The schema.
   */
  protected get schema(): Data.Schema {
    return this._schema ?? (this._schema = this.prepareSchema())
  }
  private _schema: Data.Schema

  /**
   * Whether to use default value, if all schema keys are optional and equal to Null.
   */
  protected reduce: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config: Config = settings.config ?? {}
    this.schemaRaw = config.schema ?? this.schemaRaw
    this.reduce = config.reduce ?? this.reduce
  }

  /**
   * Prepares the schema.
   */
  protected prepareSchema(): Data.Schema {
    return this.schemaRaw
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.Util.isObject(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: Obj, context: Data.Context): Promise<Obj> {
    Object.keys(data).filter(key => !(key in this.schema))
      .forEach(key => this.warn(new Data.Error.Ignored([...this.path, key])))
    let result = await this.convert("toBase", data, context)
    if (this.reduce && Object.values(result).every(value => null === value)
        && !await this.isRequired(context)) {
      result = await this.getDefault(context) as Obj
    }
    return super.inputToBase(result, context) as Promise<Obj>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: Obj, context: Data.Context): Promise<Obj> {
    const result = await this.convert("toStore", data, context)
    return super.baseToStore(result, context) as Promise<Obj>
  }

  /**
   * {@inheritdoc}
   */
  public async baseToOutput(data: Obj, context: Data.Context): Promise<Obj> {
    const result = await this.convert("toOutput", data, context)
    return super.baseToOutput(result, context) as Promise<Obj>
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: Obj, context: Data.Context): Promise<Obj> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context) as Promise<Obj>
  }

  /**
   * Common baseToStore/baseToOutput/storeToBase handler.
   */
  protected async convert(method: "toBase" | "toStore" | "toOutput", data: Obj, context: Data.Context): Promise<Obj> {
    const result: Obj = {}
    this.result = Data.Util.set(this.result, this.path, result)
    for (const key of Object.keys(this.schema)) {
      const value = await this.getHandler(key, data[key])[method](context)
      undefined !== value && (result[key] = value)
    }
    return result
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string, data: unknown): Data.Handler {
    return this.initHandler(this.schema[key], [...this.path, key])
      .initData(this.format, data)
  }

}

export { ObjectHandler as Handler }
