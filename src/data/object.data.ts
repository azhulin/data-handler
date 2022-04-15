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
   * Whether to use default value, if all schema keys are optional and equal to Null.
   */
  protected reduce: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(config: $Object.Config, settings?: Data.Settings) {
    super(config, settings)
    this.schema = config.schema ?? this.schema
    this.reduce = config.reduce ?? this.reduce
  }

  /**
   * Returns prepared schema.
   */
  protected async getSchema(format: Data.Format): Promise<Data.Schema> {
    return this._schema[format] ?? (this._schema[format] = await this.prepareSchema(format))
  }
  private _schema: { [format in Data.Format]?: Data.Schema } = {}

  /**
   * Prepares the schema.
   */
  protected async prepareSchema(format: Data.Format): Promise<Data.Schema> {
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
    const format = Data.Format.base
    const schema = await this.getSchema(format)
    Object.keys(data).filter(key => !(key in schema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    let result = await this.convert(format, data, context)
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
    const result = await this.convert(Data.Format.store, data, context)
    return super.baseToStore(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: Record<string, any>, context: Data.Context): Promise<any> {
    const result = await this.convert(Data.Format.output, data, context)
    return super.baseToOutput(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: Record<string, any>, context: Data.Context): Promise<Record<string, any>> {
    const result = await this.convert(Data.Format.base, data, context)
    return super.storeToBase(result, context) as Promise<Record<string, any>>
  }

  /**
   * Performs format conversion.
   */
  protected async convert(format: Exclude<Data.Format, Data.Format.input>, data: Record<string, any>, context: Data.Context): Promise<Record<string, any>> {
    const result: Record<string, any> = {}
    this.result = Data.set(this.result, this.path, result)
    const schema = await this.getSchema(format)
    const { base, store, output } = Data.Format
    const map = { [base]: "toBase", [store]: "toStore", [output]: "toOutput" }
    const method = map[format] as "toBase" | "toStore" | "toOutput"
    for (const [key, definition] of Object.entries(schema)) {
      const handler = this.initHandler(definition, [...this.path, key])
        .initData(this.format, data[key])
      const value = await handler[method](context)
      undefined !== value && (result[key] = value)
    }
    return result
  }

}

export namespace $Object {
  export type Config<T = any> = Data.Config<T> & {
    schema?: Data.Schema
    reduce?: boolean
  }
  export const Handler = ObjectHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return { Handler, config } }
  export function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return new Handler(config) }
}
