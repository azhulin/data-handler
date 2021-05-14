import * as Data from ".."

export type Config = Data.Config & {
  key_type?: KeyType
  options?: Options
}
export type Key = number | string
export type KeyType = "number" | "string"
export type Keys<T = Key> = T[]
export type KeysLabelsNumber = Map<number, string>
export type KeysLabelsString = Record<string, string>
export type Options = Keys | KeysLabelsNumber | KeysLabelsString

/**
 * The option data handler class.
 */
export class Handler extends Data.Handler {

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
  protected options: Options = []

  /**
   * The type of option keys.
   */
  protected keyType: KeyType = "string"

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const config: Config = settings.config ?? {}
    this.keyType = config.key_type ?? this.keyType
    this.options = config.options ?? this.options
    if (!this.optionKeys().every(key => this.isValidKeyType(key))) {
      throw new Data.Error.Unexpected(`${this.name} configuration is invalid. Option keys don't match key type.`)
    }
  }

  /**
   * {@inheritdoc}
   */
  protected async formatInputToBase(data: unknown, baseContext?: Data.BaseContext): Promise<Key> {
    try {
      return await super.formatInputToBase(data, baseContext) as Key
    }
    catch (error) {
      if (error instanceof Data.Error.Type) {
        throw new Data.Error.Option(this.path, this, this.options)
      }
      throw error
    }
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return this.isValidKeyType(data) && this.optionKeys().includes(data as Key)
  }

  /**
   * Determines whether the option key type is valid.
   */
  protected isValidKeyType(key: unknown): boolean {
    const { isNumber, isString } = Data.Util
    return ("number" === this.keyType ? isNumber : isString)(key)
  }

  /**
   * Returns option keys.
   */
  protected optionKeys(): Keys {
    return Handler.optionKeys(this.options)
  }

  /**
   * Returns option keys.
   */
  public static optionKeys(options: Options): Keys {
    return Array.isArray(options)
      ? options
      : options instanceof Map
        ? [...options.keys()]
        : Object.keys(options)
  }

}

export function conf(config?: Config) { return { ...config, Handler } }
export function init(config?: Config) { return new Handler({ config }) }
