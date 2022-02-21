import * as Data from ".."

export namespace $List {
  export type Config<T extends null | any[]> = Data.Config<T> & {
    item: Data.Definition
  }
}

/**
 * The list data handler class.
 */
export class $List<T extends null | any[]> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return `array<${this.typeId}>` }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return `${this.typeName} array` }

  /**
   * {@inheritdoc}
   */
  protected default: Data.Default<T> = {
    ...this.default,
    value: (this.default.value ?? []) as T,
  }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    length: {
      eq: (length: number): Data.Constraint<any[]> => [
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ],
      gt: (length: number): Data.Constraint<any[]> => [
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ],
      gte: (length: number): Data.Constraint<any[]> => [
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ],
      lt: (length: number): Data.Constraint<any[]> => [
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ],
      lte: (length: number): Data.Constraint<any[]> => [
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ],
      neq: (length: number): Data.Constraint<any[]> => [
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ],
    },
    unique: <Data.Constraint<any[]>>[
      "unique",
      data => {
        const items = new Set()
        for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
          if (items.has(item)) {
            return [`Values are not unique.`, { index }]
          }
          items.add(item)
        }
        return null
      }
    ],
  }

  /**
   * The list item definition.
   */
  protected item: Data.Definition

  /**
   * The list item type ID.
   */
  protected typeId: string

  /**
   * The list item type name.
   */
  protected typeName: string

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as $List.Config<T>
    if (!config.item) {
      throw new Data.ErrorUnexpected(`List configuration is invalid. Missing 'item' property.`)
    }
    this.item = config.item
    const { id, name } = this.getHandler()
    this.typeId = id
    this.typeName = name
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Array.isArray(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>> {
    const result = await this.convert("toBase", data, context)
    return super.inputToBase(result as NonNullable<T>, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: NonNullable<T>, context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toStore", data, context) as NonNullable<T>
    return super.baseToStore(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: NonNullable<T>, context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toOutput", data, context) as NonNullable<T>
    return super.baseToOutput(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: unknown[], context: Data.Context): Promise<NonNullable<T>> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context)
  }

  /**
   * Performs format conversion.
   */
  protected async convert(method: "toBase" | "toStore" | "toOutput", data: unknown[], context: Data.Context): Promise<unknown[]> {
    const result: unknown[] = []
    this.result = Data.set(this.result, this.path, result)
    const indexes = []
    for (const [index, item] of data.entries()) {
      const value = await this.getHandler(index, item)[method](context)
      undefined !== value ? result[index] = value : indexes.push(index)
    }
    indexes.reduce((delta, index) => (result.splice(index - delta++, 1), delta), 0)
    return result
  }

  /**
   * Returns data handler.
   */
  protected getHandler(index?: number, data?: unknown): Data.Handler {
    return this.initHandler(this.item, [...this.path, index ?? "#"])
      .initData(this.format, data)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $List.Config<any[]>): Data.Definition {
    return [$List, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | any[] = any[]>(config?: $List.Config<T>): $List<T> {
    return new $List<T>({ config })
  }

}
