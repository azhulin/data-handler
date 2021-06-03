import * as Data from ".."

export type Config = Data.Config & {
  item: Data.Definition
}

/**
 * The list data handler class.
 */
export class Handler extends Data.Handler {

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
  protected default: Data.Default = {
    ...this.default,
    value: this.default.value ?? [],
  }

  /**
   * {@inheritdoc}
   */
  protected constraintLibrary: Data.Constraint.Library = {
    ...this.constraintLibrary,
    unique: (data: unknown[]) => {
      const items = new Set()
      for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
        if (items.has(item)) {
          return [`Values are not unique.`, { index }]
        }
        items.add(item)
      }
      return null
    },
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
    const config = (settings.config ?? {}) as Config
    if (!config.item) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'item' property.`)
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
  protected async checkConstraint(constraint: string, data: unknown[], context: Data.Context): Promise<Data.Constraint.Result> {
    const matches = constraint.match(/^length(=|>|>=|<|<=|<>)(\d+)$/)
    if (matches) {
      const length = +matches[2]
      switch (matches[1]) {
        case "=":
          return data.length === length
            ? null
            : `Length should be equal to ${length}.`

        case ">":
          return data.length > length
            ? null
            : `Length should be greater than ${length}.`

        case ">=":
          return data.length >= length
            ? null
            : `Length should be greater than or equal to ${length}.`

        case "<":
          return data.length < length
            ? null
            : `Length should be lesser than ${length}.`

        case "<=":
          return data.length <= length
            ? null
            : `Length should be lesser than or equal to ${length}.`

        case "<>":
          return data.length !== length
            ? null
            : `Length should not be equal to ${length}.`
      }
    }
    return super.checkConstraint(constraint, data, context)
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
  protected async baseToStore(data: unknown[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toStore", data, context)
    return super.baseToStore(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async baseToOutput(data: unknown[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toOutput", data, context)
    return super.baseToOutput(result, context) as Promise<unknown[]>
  }

  /**
   * {@inheritdoc}
   */
  protected async storeToBase(data: unknown[], context: Data.Context): Promise<unknown[]> {
    const result = await this.convert("toBase", data, context)
    return super.storeToBase(result, context) as Promise<unknown[]>
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

export function conf(config: Config) { return { ...config, Handler } }
export function init(config: Config) { return new Handler({ config }) }
