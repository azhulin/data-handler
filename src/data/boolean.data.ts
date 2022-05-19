import * as Data from ".."

/**
 * The boolean data handler class.
 */
class $ extends Data.Handler<boolean> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "boolean"

  /**
   * {@inheritdoc}
   */
  public name: string = "Boolean"

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
  protected isValidType(data: unknown): boolean {
    return "boolean" === typeof data
  }

}

/**
 * The boolean data handler namespace.
 */
export namespace $Boolean {
  export type Config = Data.Config<boolean>
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config = {}) { return $.conf($, config) }
  export function init(config: Config = {}) { return $.init($, config) }
}
