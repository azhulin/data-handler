import * as Data from ".."

/**
 * The string data handler class.
 */
class $ extends Data.Handler<string> {

  /**
   * {@inheritdoc}
   */
  public static id: string = "string"

  /**
   * {@inheritdoc}
   */
  public name: string = "String"

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
    length: Data.inequalityConstraints<string>(
      `${$.id}:length`, data => data.length, "Length",
    ),
    trimmed: <Data.Constraint<string>>[
      `${$.id}:trimmed`,
      data => data === data.trim() ? null : "Value must be trimmed.",
    ],
  }

  /**
   * {@inheritdoc}
   */
  public static processor = {
    ...Data.Handler.processor,
    trim: (data: string) => data.trim(),
    lower: (data: string) => data.toLowerCase(),
    upper: (data: string) => data.toUpperCase(),
  }

  /**
   * {@inheritdoc}
   */
  protected isValidType(data: unknown): boolean {
    return "string" === typeof data
  }

}

/**
 * The string data handler namespace.
 */
export namespace $String {
  export type Config = Data.Config<string>
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config = {}) { return $.conf($, config) }
  export function init(config: Config = {}) { return $.init($, config) }
}
