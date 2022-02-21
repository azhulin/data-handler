import * as Data from ".."

export namespace $String {
  export type Config<T extends null | string> = Data.Config<T>
}

/**
 * The string data handler class.
 */
export class $String<T extends null | string> extends Data.Handler<T> {

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
    trimmed: <Data.Constraint<string>>[
      "trimmed",
      (data: string) => data === data.trim() ? null : "Value should be trimmed.",
    ],
    length: {
      eq: (length: number): Data.Constraint<string> => [
        `length=${length}`,
        data => data.length === length ? null : `Length should be equal to ${length}.`,
      ],
      gt: (length: number): Data.Constraint<string> => [
        `length>${length}`,
        data => data.length > length ? null : `Length should be greater than ${length}.`,
      ],
      gte: (length: number): Data.Constraint<string> => [
        `length>=${length}`,
        data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
      ],
      lt: (length: number): Data.Constraint<string> => [
        `length<${length}`,
        data => data.length < length ? null : `Length should be lesser than ${length}.`,
      ],
      lte: (length: number): Data.Constraint<string> => [
        `length<=${length}`,
        data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
      ],
      neq: (length: number): Data.Constraint<string> => [
        `length<>${length}`,
        data => data.length !== length ? null : `Length should not be equal to ${length}.`,
      ],
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
  protected async inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>> {
    const original = data
    data = await super.inputToBase(data, context)
    original !== data
      && this.warn(new Data.ErrorAdapted(this.path, original, data))
    return data
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $String.Config<string>): Data.Definition {
    return [$String, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | string = string>(config?: $String.Config<T>): $String<T> {
    return new $String<T>({ config })
  }

}
