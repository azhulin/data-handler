import * as Data from ".."

/**
 * The timestamp data handler class.
 */
class TimestampHandler extends Data.Handler<number> {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "timestamp" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "Timestamp" }

  /**
   * {@inheritdoc}
   */
  public get typeDesc(): string { return `e.g. ${Date.now()}` }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    ...Data.inequalityConstraints<number>("", data => data, "Value"),
    future: <Data.Constraint<number>>[">now", data =>
      data > Date.now() ? null : "Future date expected.",
    ],
    past: <Data.Constraint<number>>["<now", data =>
      data < Date.now() ? null : "Past date expected.",
    ],
  }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return Data.isIndex(data)
  }

}

/**
 * The timestamp data handler namespace.
 */
export namespace $Timestamp {
  export type Config<T = number> = Data.Config<T>
  export const Handler = TimestampHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}): Data.Definition { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
