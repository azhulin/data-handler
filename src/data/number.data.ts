import * as Data from ".."

/**
 * The number data handler class.
 */
class NumberHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "number" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Number" }

  /**
   * {@inheritdoc}
   */
  public get description(): string {
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
    eq: (value: number) => new Data.Constraint<number>(
      `=${value}`,
      data => data === value ? null : `Value should be equal to ${value}.`,
    ),
    gt: (value: number) => new Data.Constraint<number>(
      `>${value}`,
      data => data > value ? null : `Value should be greater than ${value}.`,
    ),
    gte: (value: number) => new Data.Constraint<number>(
      `>=${value}`,
      data => data >= value ? null : `Value should be greater than or equal to ${value}.`,
    ),
    lt: (value: number) => new Data.Constraint<number>(
      `<${value}`,
      data => data < value ? null : `Value should be lesser than ${value}.`,
    ),
    lte: (value: number) => new Data.Constraint<number>(
      `<=${value}`,
      data => data <= value ? null : `Value should be lesser than or equal to ${value}.`,
    ),
    neq: (value: number) => new Data.Constraint<number>(
      `<>${value}`,
      data => data !== value ? null : `Value should not be equal to ${value}.`,
    ),
  }

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as $Number.Config
    this.decimals = config.decimals ?? this.decimals
    if (null !== this.decimals && !Data.isIndex(this.decimals)) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "number" === typeof data && isFinite(data)
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: number, context: Data.Context): Promise<number> {
    const original = data
    data = null !== this.decimals ? +data.toFixed(this.decimals) : data
    original !== data
      && this.warn(new Data.ErrorAdapted(this.path, original, data))
    return super.inputToBase(data, context) as Promise<number>
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
  export function init(config: Config = {}) { return new Handler({ config }) }
}
