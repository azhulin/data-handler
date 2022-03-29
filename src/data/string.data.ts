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
    length: {
      eq: (length: number) => new Data.Constraint<string>(
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ),
      gt: (length: number) => new Data.Constraint<string>(
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ),
      gte: (length: number) => new Data.Constraint<string>(
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ),
      lt: (length: number) => new Data.Constraint<string>(
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ),
      lte: (length: number) => new Data.Constraint<string>(
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ),
      neq: (length: number) => new Data.Constraint<string>(
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ),
    },
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
