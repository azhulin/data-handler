import * as Data from ".."

export type Config = Data.Config & {
  span?: string
  decimals?: number
}

/**
 * The number data handler class.
 */
export default class NumberHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public id: string = "number"

  /**
   * {@inheritdoc}
   */
  public name: string = "Number"

  /**
   * {@inheritdoc}
   */
  public get description(): string {
    const prefix = this.getSpanPrefix()
    const parts = prefix ? [prefix] : []
    switch (this.decimals) {
      case null:
        break

      case 0:
        parts.push("integer")
        break

      case 1:
        parts.push("1 decimal place")
        break

      default:
        parts.push(`${this.decimals} decimal places`)
        break
    }
    return parts.join(" ")
  }

  /**
   * Whether the number can be negative.
   */
  protected negative: boolean = true

  /**
   * Whether the number can be zero.
   */
  protected zero: boolean = true

  /**
   * Whether the number can be positive.
   */
  protected positive: boolean = true

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
    const map = { negative: "-", zero: "0", positive: "+" }
    type Prop = keyof typeof map
    Object.entries(map).forEach(([prop, flag]) =>
      this[prop as Prop] = (config.span ?? "-0+").includes(flag))
    if (Object.keys(map).every(property => !(this[property as Prop]))) {
      throw new Data.Error.Internal(`${this.name} configuration is invalid. Invalid 'span' property.`)
    }
    this.decimals = config.decimals ?? this.decimals
    if (null !== this.decimals && !Data.Util.isIndex(this.decimals)) {
      throw new Data.Error.Internal(`${this.name} configuration is invalid. Invalid 'decimals' property.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "number" === typeof data && isFinite(data)
      && (0 !== this.decimals || Number.isInteger(data))
      && (
        0 < data && this.positive
        || 0 === data && this.zero
        || 0 > data && this.negative
      )
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
    const matches = constraint.match(/^([><]?=?)(\d+)$/)
    if (matches && matches[1]) {
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
      }
    }
    return super.checkConstraint(constraint, data, context)
  }

  /**
   * Return number type span prefix.
   */
  protected getSpanPrefix(): string {
    const span = (this.negative ? "-" : "")
      + (this.zero ? "0" : "") + (this.positive ? "+" : "")
    switch (span) {
      case "-":
        return "negative"

      case "0":
        return "zero"

      case "-0":
        return "not positive"

      case "+":
        return "positive"

      case "-+":
        return "not zero"

      case "0+":
        return "not negative"

      default:
        return ""
    }
  }

}

export { NumberHandler as Handler }
