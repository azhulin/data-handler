import * as Data from ".."

export type Config = Data.Config & {
  decimals?: number
}

/**
 * The number data handler class.
 */
export class Handler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string {
    return 0 === this.decimals ? "number.integer" : "number"
  }

  /**
   * {@inheritdoc}
   */
  public name: string = "Number"

  /**
   * {@inheritdoc}
   */
  public get description(): string {
    switch (this.decimals) {
      case null:
        return ""

      case 0:
        return "integer"

      case 1:
        return "1 decimal place"

      default:
        return `${this.decimals} decimal places`
    }
  }

  /**
   * The number of decimal points.
   */
  protected decimals: number | null = null

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = settings.config as Config
    this.decimals = config.decimals ?? this.decimals
    if (null !== this.decimals && !Data.Util.isIndex(this.decimals)) {
      throw new Data.Error.Unexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "number" === typeof data && isFinite(data)
      && (0 !== this.decimals || Number.isInteger(data))
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: number, context: Data.Context): Promise<number> {
    const original = data
    data = null !== this.decimals ? +data.toFixed(this.decimals) : data
    original !== data
      && this.warn(new Data.Error.Adapted(this.path, original, data))
    return super.inputToBase(data, context) as Promise<number>
  }

  /**
   * {@inheritdoc}
   */
  protected async checkConstraint(constraint: string, data: number, context: Data.Context): Promise<Data.Constraint.Result> {
    const matches = constraint.match(/^(=|>|>=|<|<=|<>)(\d+)$/)
    if (matches) {
      const value = +matches[2]
      switch (matches[1]) {
        case "=":
          return data === value
            ? null
            : `Value should be equal to ${value}.`

        case ">":
          return data > value
            ? null
            : `Value should be greater than ${value}.`

        case ">=":
          return data >= value
            ? null
            : `Value should be greater than or equal to ${value}.`

        case "<":
          return data < value
            ? null
            : `Value should be lesser than ${value}.`

        case "<=":
          return data <= value
            ? null
            : `Value should be lesser than or equal to ${value}.`

        case "<>":
          return data !== value
            ? null
            : `Value should not be equal to ${value}.`
      }
    }
    return super.checkConstraint(constraint, data, context)
  }

}

export function conf(config?: Config) { return { Handler, ...config } }
export function init(config?: Config) { return new Handler({ config }) }
