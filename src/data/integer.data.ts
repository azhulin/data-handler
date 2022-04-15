import { $Number } from "."

/**
 * The integer data handler class.
 */
class IntegerHandler extends $Number.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".integer" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Integer" }

  /**
   * {@inheritdoc}
   */
  public get description(): string { return "" }

  /**
   * {@inheritdoc}
   */
  protected decimals: null | number = 0

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return super.isValid(data) && Number.isInteger(data)
  }

}

export namespace $Integer {
  export type Config = Omit<$Number.Config, "decimals">
  export const Handler = IntegerHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
