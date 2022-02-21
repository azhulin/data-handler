import * as Data from ".."

export namespace $Option {
  export type Config<T extends null | number | string> = Data.Config<T> & {
    key_type?: KeyType
    options?: Options
  }
  export type KeyType = "number" | "string"
  export type Keys<T = number | string> = T[]
  export type KeysLabelsNumber = Map<number, string>
  export type KeysLabelsString = Record<string, string>
  export type Options = Keys | KeysLabelsNumber | KeysLabelsString
}

/**
 * The option data handler class.
 */
export class $Option<T extends null | number | string> extends Data.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return this.keyType }

  /**
   * {@inheritdoc}
   */
  public get name(): string {
    return "string" === this.keyType ? "String" : "Number"
  }

  /**
   * The options.
   */
  protected options: $Option.Options = []

  /**
   * The type of option keys.
   */
  protected keyType: $Option.KeyType = "string"

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config = (settings.config ?? {}) as $Option.Config<T>
    this.keyType = config.key_type ?? this.keyType
    this.options = config.options ?? this.options
    if (!this.optionKeys().every(key => this.isValidKeyType(key))) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Option keys don't match key type.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected async formatInputToBase(data: unknown, baseContext?: Data.BaseContext): Promise<T> {
    try {
      return await super.formatInputToBase(data, baseContext)
    }
    catch (error) {
      if (error instanceof Data.ErrorType) {
        throw new Data.ErrorOption(this.path, this, this.options)
      }
      throw error
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return this.isValidKeyType(data) && this.optionKeys().includes(data as T)
  }

  /**
   * Determines whether the option key type is valid.
   */
  protected isValidKeyType(key: unknown): boolean {
    switch (this.keyType) {
      case "number":
        return "number" === typeof key && isFinite(key)

      case "string":
        return "string" === typeof key
    }
  }

  /**
   * Returns option keys.
   */
  protected optionKeys(): T[] {
    return <unknown>$Option.optionKeys(this.options) as T[]
  }

  /**
   * Returns option keys.
   */
  public static optionKeys(options: $Option.Options): $Option.Keys {
    return Array.isArray(options)
      ? options
      : options instanceof Map
        ? [...options.keys()]
        : Object.keys(options)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Option.Config<number | string>): Data.Definition {
    return [$Option, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | number | string = number | string>(config?: $Option.Config<T>): $Option<T> {
    return new $Option<T>({ config })
  }

}
