import * as Data from ".."

/**
 * The string data handler class.
 */
class StringHandler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "string" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "String" }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...Data.Handler.constraint,
    trimmed: new Data.Constraint<string>(
      "trimmed",
      data => data === data.trim() ? null : "Value should be trimmed.",
    ),
    length: Data.inequalityConstraints<string>(
      "length", data => data.length, "Length",
    ),
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
  protected isValid(data: unknown): boolean {
    return "string" === typeof data
  }

  /**
   * {@inheritdoc}
   */
  protected async inputToBase(data: string, context: Data.Context): Promise<string> {
    const original = data
    data = await super.inputToBase(data, context) as string
    original !== data
      && this.warn(new Data.ErrorAdapted(this.path, original, data))
    return data
  }

}

export namespace $String {
  export type Config<T = string> = Data.Config<T>
  export const Handler = StringHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler({ config }) }
}
