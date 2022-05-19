import * as Data from ".."

/**
 * The timestamp data handler class.
 */
class $ extends Data.Handler<number> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "timestamp"

  /**
   * {@inheritdoc}
   */
  public name: string = "Timestamp"

  /**
   * {@inheritdoc}
   */
  public type: string = $.id

  /**
   * {@inheritdoc}
   */
  public typeName: string = this.name

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    ...Data.inequalityConstraints<number>(
      `${$.id}:`, data => data, "Value",
    ),
    future: <Data.Constraint<number>>[
      `${$.id}:future`,
      data => data > Date.now() ? null : "Future date expected.",
    ],
    past: <Data.Constraint<number>>[
      `${$.id}:past`,
      data => data < Date.now() ? null : "Past date expected.",
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
  export type Config = Data.Config<number>
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config = {}) { return $.conf($, config) }
  export function init(config: Config = {}) { return $.init($, config) }
}
