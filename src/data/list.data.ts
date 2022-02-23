import * as Data from ".."

/**
 * The list data handler class.
 */
class ListHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return `array<${this.itemId}>` }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return `${this.itemName} array` }

  /**
   * {@inheritdoc}
   */
  protected default: Data.Default<null | any[]> = {
    ...this.default,
    value: this.default.value ?? [],
  }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    length: {
      eq: (length: number) => new Data.Constraint<any[]>(
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ),
      gt: (length: number) => new Data.Constraint<any[]>(
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ),
      gte: (length: number) => new Data.Constraint<any[]>(
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ),
      lt: (length: number) => new Data.Constraint<any[]>(
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ),
      lte: (length: number) => new Data.Constraint<any[]>(
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ),
      neq: (length: number) => new Data.Constraint<any[]>(
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ),
    },
    unique: new Data.Constraint<any[]>(
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
    ),
  }

  /**
   * The list item definition.
   */
  protected item: Data.Definition

  /**
   * The list item type ID.
   */
  protected itemId: string

  /**
   * The list item type name.
   */
  protected itemName: string

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as $List.Config
    if (!config.item) {
      throw new Data.ErrorUnexpected(`List configuration is invalid. Missing 'item' property.`)
    }
    this.item = config.item
    const { id, name } = this.getHandler()
    this.itemId = id
    this.itemName = name
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
  protected async inputToBase(data: unknown[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toBase", data, context)
    return super.inputToBase(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: any[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toStore", data, context)
    return super.baseToStore(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: any[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toOutput", data, context)
    return super.baseToOutput(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: unknown[], context: Data.Context): Promise<any[]> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context) as Promise<any[]>
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

}

export namespace $List {
  export type Config<T extends any[] = any[]> = Data.Config<T> & {
    item: Data.Definition
  }
  export const Handler = ListHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends any[] = any[]>(config: Config<T>) { return { Handler, config } }
  export function init<T extends any[] = any[]>(config: Config<T>) { return new Handler({ config }) }
}
