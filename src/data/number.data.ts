import * as Data from ".."

/**
 * The number data handler class.
 */
class $ extends Data.Handler<number> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "number"

  /**
   * {@inheritdoc}
   */
  public name: string = "Number"

  /**
   * {@inheritdoc}
   */
  public type: string = $.id

  /**
   * {@inheritdoc}
   */
  public typeName: string = this.name

  /**
   * The number of decimal places.
   */
  protected decimals: null | number = null

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    ...Data.inequalityConstraints<number>(`${$.id}:`, data => data, "Value"),
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
  export type Config = Data.Config<number> & {
    decimals?: number
  }
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config = {}) { return $.conf($, config) }
  export function init(config: Config = {}) { return $.init($, config) }
}
