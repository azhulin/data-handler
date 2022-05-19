import * as Data from ".."

/**
 * The integer data handler class.
 */
class $ extends Data.Handler<number> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "integer"

  /**
   * {@inheritdoc}
   */
  public name: string = "Integer"

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
    ...Data.inequalityConstraints<number>(`${$.id}:`, data => data, "Value"),
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
  export type Config = Data.Config<number>
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config = {}) { return $.conf($, config) }
  export function init(config: Config = {}) { return $.init($, config) }
}
