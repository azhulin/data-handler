import * as Data from ".."

/**
 * The list data handler class.
 */
class $<T> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "list"

  /**
   * {@inheritdoc}
   */
  public name: string = "List"

  /**
   * {@inheritdoc}
   */
  public get type(): string { return `array<${this.itemHandler.type}>` }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return `${this.itemHandler.typeName} array` }

  /**
   * {@inheritdoc}
   */
  protected default: Data.Default<null | any[]> = {
    ...this.default,
    value: undefined !== this.config.default?.value ? this.default.value : [],
  }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    length: Data.inequalityConstraints<any[]>(
      `${$.id}:length`, data => data.length, "Length",
    ),
    items_unique: <Data.Constraint<any[]>>[
      `${$.id}:items_unique`,
      (data, { handler }) => {
        const items = new Set()
        for (const [index, item] of data.entries()) {
          if (items.has(item)) {
            return [`${handler.name} items are not unique.`, { index }]
          }
          items.add(item)
        }
        return null
      },
    ],
  }

  /**
   * The list item data definition.
   */
  protected item?: Data.Definition

  /**
   * The list item data handler.
   */
  protected get itemHandler(): Data.Handler {
    return this._itemHandler ?? (this._itemHandler = this.getHandler())
  }
  private _itemHandler?: Data.Handler

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$List.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.item = config.item ?? this.item
  }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return Array.isArray(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: any[], context: Data.Context): Promise<any[]> {
    const result = await this.convert(Data.Format.base, data, context)
    return super.inputToBase(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToStore(data: any[], context: Data.Context): Promise<any[]> {
    const result = await this.convert(Data.Format.store, data, context)
    return super.baseToStore(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: any[], context: Data.Context): Promise<any[]> {
    const result = await this.convert(Data.Format.output, data, context)
    return super.baseToOutput(result, context)
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: any[], context: Data.Context): Promise<any[]> {
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
  protected async convert(format: Data.Format, data: any[], context: Data.Context): Promise<any[]> {
    const result: unknown[] = []
    this.result = Data.set(this.result, this.path, result)
    const indexes = []
    for (const [index, item] of data.entries()) {
      const value = await this.getHandler(index, item).to(format, context)
      undefined !== value ? result[index] = value : indexes.push(index)
    }
    indexes.reduce((delta, index) => (result.splice(index - delta++, 1), delta), 0)
    return result
  }

  /**
   * Returns the list item data handler instance for the specified list index.
   *
   * @param index - The list index to return the list item data handler instance
   *   for.
   * @param data - The list item data.
   *
   * @returns A list item data handler instance for the specified list index.
   */
  protected getHandler(index?: number, data?: unknown): Data.Handler {
    return this.initHandler(this.getItem(), [...this.path, index ?? "#"])
      .in(this.format, data)
  }

  /**
   * Returns the list item data definition.
   *
   * @returns List item data definition.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `item` data handler property is missing.
   */
  protected getItem(): Data.Definition {
    if (!this.item) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'item' property.`)
    }
    return this.item
  }

}

/**
 * The list data handler namespace.
 */
export namespace $List {
  export type Config<T = any> = Data.Config<T> & {
    item: Data.Definition
  }
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf<T extends unknown[]>(config: Config<T>) { return $.conf($, config) }
  export function init<T extends unknown[]>(config: Config<T>) { return $.init<T>($, config) }
}
