import * as Data from ".."

/**
 * The integer data handler class.
 */
class IntegerHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "integer" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "Integer" }

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
  protected isValidType(data: unknown): boolean {
    return Number.isInteger(data)
  }

}

export namespace $Integer {
  export type Config = Data.Config
  export const Handler = IntegerHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
