import * as Data from ".."

/**
 * The boolean data handler class.
 */
class BooleanHandler extends Data.Handler<boolean> {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "boolean" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "Boolean" }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return "boolean" === typeof data
  }

}

/**
 * The boolean data handler namespace.
 */
export namespace $Boolean {
  export type Config<T = boolean> = Data.Config<T>
  export const Handler = BooleanHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}): Data.Definition { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
