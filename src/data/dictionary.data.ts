import * as Data from ".."
import { $Object, $String } from "."

/**
 * The dictionary data handler class.
 */
class DictionaryHandler extends $Object.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".dictionary" }

  /**
   * {@inheritdoc}
   */
  public get label(): string { return "Dictionary" }

  /**
   * The dictionary key data definition.
   */
  protected key: Data.Definition

  /**
   * The dictionary value data definition.
   */
  protected value: Data.Definition

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super(settings)
    const { key, value } = (settings.config ?? {}) as $Dictionary.Config
    if (!key) {
      throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'key' property.`)
    }
    if (!value) {
      throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'value' property.`)
    }
    if (key.Handler !== $String.Handler && !(key.Handler.prototype instanceof $String.Handler)) {
      throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Key handler must inherit a string handler.`)
    }
    this.key = key
    this.value = value
  }

  /**
   * {@inheritdoc}
   */
  protected async prepareSchema(format: Data.Format, context: Data.Context): Promise<Data.Schema> {
    const handler = this.initHandler(this.key)
    for (const value of Object.keys(this.data as Record<string, any>)) {
      let key
      try {
        key = await handler.initData(this.format, value).formatData(format, context)
      }
      catch (error) {
        if (error instanceof Data.ErrorExpected) {
          const { type, message, details } = error
          throw new Data.ErrorConstraint("Object key is invalid.", this.path, this.id, "valid_key", {
            key: { value, error: { type, message, details } },
          })
        }
        throw error
      }
      this.schema[key as string] = this.value
    }
    return this.schema
  }

}

export namespace $Dictionary {
  export type Config<T = Record<string, any>> = Omit<$Object.Config<T>, "schema" | "reduce"> & {
    key: Data.Definition
    value: Data.Definition
  }
  export const Handler = DictionaryHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return { Handler, config } }
  export function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return new Handler({ config }) }
}
