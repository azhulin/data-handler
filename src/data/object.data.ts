import * as Data from ".."

/**
 * The object data handler class.
 */
class $<T> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "object"

  /**
   * {@inheritdoc}
   */
  public name: string = "Object"

  /**
   * {@inheritdoc}
   */
  public type: string = $.id

  /**
   * {@inheritdoc}
   */
  public typeName: string = this.name

  /**
   * {@inheritdoc}
   */
  protected preprocessors: Data.Processor.List<any> = [
    async (data, { source }) => {
      if (this.warnExtraKeys) {
        const schema = await this.getSchema()
        Object.keys(source() ?? {}).filter(key => !(key in schema)).forEach(
          key => this.warnings.push(new Data.ErrorIgnored([...this.path, key]))
        )
      }
      return data
    },
  ]

  /**
   * The object data schema.
   */
  protected schema?: Data.Schema

  /**
   * Whether to generate warnings if data contains keys missing in data schema.
   */
  protected warnExtraKeys: boolean = true

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$Object.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.schema = config.schema ?? this.schema
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
    const result: Record<string, any> = {}
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

  /**
   * Returns the data schema.
   *
   * @returns A data schema.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `schema` data handler property is missing.
   */
  protected async getSchema(): Promise<Data.Schema> {
    if (!this.schema) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'schema' property.`)
    }
    return this.schema
  }

}

/**
 * The object data handler namespace.
 */
export namespace $Object {
  export type Config<T = any> = Data.Config<T> & {
    schema: Data.Schema
  }
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf<T extends Record<string, any>>(config: Config<T>) { return $.conf($, config) }
  export function init<T extends Record<string, any>>(config: Config<T>) { return $.init<T>($, config) }
}
