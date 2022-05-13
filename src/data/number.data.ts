import * as Data from ".."

/**
 * The number data handler class.
 */
class NumberHandler extends Data.Handler {

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
   * The number of decimal points.
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
   */
  protected postprocessors: Data.Processor.List<number> = [
    data => null !== this.decimals ? +data.toFixed(this.decimals) : data,
  ]

  /**
   * {@inheritdoc}
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
    const original = data
    data = await super.inputToBase(data, context) as number
    original !== data
      && this.warnings.push(new Data.ErrorAdapted(this.path, original, data))
    return data
  }

}

export namespace $Number {
  export type Config<T = number> = Data.Config<T> & {
    decimals?: number
  }
  export const Handler = NumberHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
