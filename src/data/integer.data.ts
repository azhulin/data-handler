import * as Data from ".."

/**
 * The integer data handler class.
 */
class IntegerHandler extends Data.Handler<number> {

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

/**
 * The integer data handler namespace.
 */
export namespace $Integer {
  export type Config<T = number> = Data.Config<T>
  export const Handler = IntegerHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}): Data.Definition { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
