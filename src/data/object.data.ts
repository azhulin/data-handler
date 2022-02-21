import * as Data from ".."

export namespace $Object {
  export type Config<T extends null | Record<string, any>> = Data.Config<T> & {
    schema: Data.Schema
    reduce?: boolean
  }
}

/**
 * The object data handler class.
 */
export class $Object<T extends null | Record<string, any>> extends Data.Handler<T> {

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
    const config = (settings.config ?? {}) as $Object.Config<T>
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
  protected async inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>> {
    Object.keys(data).filter(key => !(key in this.preparedSchema))
      .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])))
    let result = await this.convert("toBase", data, context)
    if (this.reduce && Object.values(result!).every(value => null === value)
        && !await this.isRequired(context)) {
      result = await this.getDefault(context) as NonNullable<T>
    }
    return super.inputToBase(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: NonNullable<T>, context: Data.Context): Promise<unknown> {
    const result = await this.convert("toStore", data, context) as NonNullable<T>
    return super.baseToStore(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: NonNullable<T>, context: Data.Context): Promise<unknown> {
    const result = await this.convert("toOutput", data, context) as NonNullable<T>
    return super.baseToOutput(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context)
  }

  /**
   * Performs format conversion.
   */
  protected async convert(method: "toBase" | "toStore" | "toOutput", data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>> {
    const result: Record<string, any> = {}
    this.result = Data.set(this.result, this.path, result)
    for (const key of Object.keys(this.preparedSchema)) {
      const value = await this.getHandler(key, data[key])[method](context)
      undefined !== value && (result[key] = value)
    }
    return result as NonNullable<T>
  }

  /**
   * Returns data handler.
   */
  protected getHandler(key: string, data: unknown): Data.Handler {
    return this.initHandler(this.preparedSchema[key], [...this.path, key])
      .initData(this.format, data)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Object.Config<Record<string, any>>): Data.Definition {
    return [$Object, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | Record<string, any> = Record<string, any>>(config?: $Object.Config<T>): $Object<T> {
    return new $Object<T>({ config })
  }

}
