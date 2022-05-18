import * as Data from ".."

/**
 * The object data handler class.
 */
class ObjectHandler<T> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "object" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "Object" }

  /**
   * {@inheritdoc}
   */
  protected preprocessors: Data.Processor.List<any> = [
    async (data, { source }) => {
      const schema = await this.getSchema()
      Object.keys(source() ?? {}).filter(key => !(key in schema))
        .forEach(key => this.warnings.push(new Data.ErrorIgnored([...this.path, key])))
      return data
    },
  ]

  /**
   * The object data schema.
   */
  protected schema: $Object.Schema = {}

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$Object.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.schema = config.schema ?? this.schema
  }

  /**
   * Returns the data schema.
   *
   * @returns A promise that resolves with a data schema.
   */
  protected async getSchema(): Promise<$Object.Schema> {
    return this._schema ?? (this._schema = await this.prepareSchema())
  }
  private _schema?: $Object.Schema

  /**
   * Returns the prepared data schema.
   *
   * @returns A promise that resolves with a prepared data schema.
   */
  protected async prepareSchema(): Promise<$Object.Schema> {
    return this.schema
  }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return Data.isObject(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: any, context: Data.Context): Promise<any> {
    const result = await this.convert(Data.Format.base, data, context)
    return super.inputToBase(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: any, context: Data.Context): Promise<any> {
    const result = await this.convert(Data.Format.store, data, context)
    return super.baseToStore(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: any, context: Data.Context): Promise<any> {
    const result = await this.convert(Data.Format.output, data, context)
    return super.baseToOutput(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: any, context: Data.Context): Promise<any> {
    const result = await this.convert(Data.Format.base, data, context)
    return super.storeToBase(result, context)
  }

  /**
   * Performs the data format conversion.
   *
   * @param format - The data format to convert the data to.
   * @param data - The data to convert.
   * @param context - The data context.
   *
   * @returns A promise that resolves with a converted data.
   */
  protected async convert(format: Data.Format, data: any, context: Data.Context): Promise<any> {
    const result: Record<string, unknown> = {}
    this.result = Data.set(this.result, this.path, result)
    const schema = await this.getSchema()
    for (const [key, definition] of Object.entries(schema)) {
      const handler = this.initHandler(definition, [...this.path, key])
        .in(this.format, data[key])
      const value = await handler.to(format, context)
      undefined !== value && (result[key] = value)
    }
    return result
  }

}

/**
 * The object data handler namespace.
 */
export namespace $Object {
  export type Config<T = any> = Data.Config<T> & {
    schema: Schema
  }
  export type Schema = Record<string, Data.Definition>
  export const Handler = ObjectHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends Record<string, unknown>>(config: Config<T>): Data.Definition { return { Handler, config } }
  export function init<T extends Record<string, unknown>>(config: Config<T>) { return new Handler<T>(config) }
}
