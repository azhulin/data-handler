import * as Data from ".."

/**
 * The number data handler class.
 */
class NumberHandler extends Data.Handler<number> {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "number" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "Number" }

  /**
   * {@inheritdoc}
   */
  public get typeDesc(): string {
    switch (this.decimals) {
      case null:
        return ""

      case 1:
        return "1 decimal place"

      default:
        return `${this.decimals} decimal places`
    }
  }

  /**
   * The number of decimal places.
   */
  protected decimals: null | number = null

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    ...Data.inequalityConstraints<number>("", data => data, "Value"),
  }

  /**
   * {@inheritdoc}
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `decimals` data handler property is invalid.
   */
  public constructor(config: $Number.Config, settings?: Data.Settings) {
    super(config, settings)
    this.decimals = config.decimals ?? this.decimals
    if (null !== this.decimals && !Data.isIndex(this.decimals)) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return "number" === typeof data && isFinite(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: number, context: Data.Context): Promise<number> {
    data = await super.inputToBase(data, context)
    return null !== this.decimals ? +data.toFixed(this.decimals) : data
  }

}

/**
 * The number data handler namespace.
 */
export namespace $Number {
  export type Config<T = number> = Data.Config<T> & {
    decimals?: number
  }
  export const Handler = NumberHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}): Data.Definition { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
