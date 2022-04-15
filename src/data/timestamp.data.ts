import * as Data from ".."
import { $Number } from "."

/**
 * The timestamp data handler class.
 */
class TimestampHandler extends $Number.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".timestamp" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Timestamp" }

  /**
   * {@inheritdoc}
   */
  public get description(): string { return `e.g. ${Date.now()}` }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...$Number.constraint,
    future: new Data.Constraint<number>(">now", data =>
      data > Date.now() ? null : "Future date expected.",
    ),
    past: new Data.Constraint<number>("<now", data =>
      data < Date.now() ? null : "Past date expected.",
    ),
  }

  /**
   * {@inheritdoc}
   */
  protected decimals: null | number = 0

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.isIndex(data)
  }

}

export namespace $Timestamp {
  export type Config = Omit<$Number.Config, "decimals">
  export const Handler = TimestampHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
