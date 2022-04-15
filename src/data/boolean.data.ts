import * as Data from ".."

/**
 * The boolean data handler class.
 */
class BooleanHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "boolean" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Boolean" }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "boolean" === typeof data
  }

}

export namespace $Boolean {
  export type Config<T = boolean> = Data.Config<T>
  export const Handler = BooleanHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
