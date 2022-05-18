import * as Data from ".."

/**
 * The string data handler class.
 */
class StringHandler extends Data.Handler<string> {

  /**
   * {@inheritdoc}
   */
  public get type(): string { return "string" }

  /**
   * {@inheritdoc}
   */
  public get typeName(): string { return "String" }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    length: Data.inequalityConstraints<string>(
      "length", data => data.length, "Length",
    ),
    trimmed: <Data.Constraint<string>>["trimmed", data =>
      data === data.trim() ? null : "Value must be trimmed.",
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
  export type Config<T = string> = Data.Config<T>
  export const Handler = StringHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}): Data.Definition { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
