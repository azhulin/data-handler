import * as Data from ".."

export type Config = Data.Config

/**
 * The string data handler class.
 */
export class Handler extends Data.Handler {

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
  protected constraintLibrary: Data.Constraint.Library = {
    ...this.constraintLibrary,
    trimmed: (data: string) =>
      data === data.trim() ? null : "Value should be trimmed."
  }

  /**
   * {@inheritdoc}
   */
  protected processorLibrary: Data.Processor.Library = {
    ...this.processorLibrary,
    trim: (data: string): string => data.trim(),
    lower: (data: string): string => data.toLowerCase(),
    upper: (data: string): string => data.toUpperCase(),
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
      && this.warn(new Data.Error.Adapted(this.path, original, data))
    return data
  }

  /**
   * {@inheritdoc}
   */
  protected async checkConstraint(constraint: string, data: string, context: Data.Context): Promise<Data.Constraint.Result> {
    const matches = constraint.match(/^length(=|>|>=|<|<=|<>)(\d+)$/)
    if (matches) {
      const length = +matches[2]
      switch (matches[1]) {
        case "=":
          return data.length === length
            ? null
            : `Length should be equal to ${length}.`

        case ">":
          return data.length > length
            ? null
            : `Length should be greater than ${length}.`

        case ">=":
          return data.length >= length
            ? null
            : `Length should be greater than or equal to ${length}.`

        case "<":
          return data.length < length
            ? null
            : `Length should be lesser than ${length}.`

        case "<=":
          return data.length <= length
            ? null
            : `Length should be lesser than or equal to ${length}.`

        case "<>":
          return data.length !== length
            ? null
            : `Length should not be equal to ${length}.`
      }
    }
    return super.checkConstraint(constraint, data, context)
  }

}

export function conf(config?: Config) { return { Handler, ...config } }
export function init(config?: Config) { return new Handler({ config }) }
