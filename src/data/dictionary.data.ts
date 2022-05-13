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
  public get name(): string { return "Dictionary" }

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...$Object.Handler.constraint,
    items_number: Data.inequalityConstraints<Record<string, any>>(
      "items_number", data => Object.keys(data).length, "Number of items",
    ),
  }

  /**
   * The dictionary key data definition.
   */
  protected key?: Data.Definition

  /**
   * The dictionary value data definition.
   */
  protected value?: Data.Definition

  /**
   * {@inheritdoc}
   */
  public constructor(config: $Dictionary.Config, settings?: Data.Settings) {
    super(config, settings)
    const { key, value } = config
    key && (this.key = key)
    value && (this.value = value)
  }

  /**
   * {@inheritdoc}
   */
  protected async prepareSchema(format: Data.Format): Promise<$Object.Schema> {
    if (!this.key) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'key' property.`)
    }
    if (!this.value) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'value' property.`)
    }
    if (this.key.Handler !== $String.Handler && !(this.key.Handler.prototype instanceof $String.Handler)) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Key handler must inherit a string handler.`)
    }
    const handler = this.initHandler(this.key)
    for (const value of Object.keys(this.data as Record<string, any>)) {
      let key
      try {
        key = await handler.initData(this.format, value).formatData(format)
      }
      catch (error) {
        if (error instanceof Data.ErrorExpected) {
          const { type, message, details } = error
          throw new Data.ErrorConstraint(this, "valid_key", "Object key is invalid.", {
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
  export type Config<T = any> = Omit<$Object.Config<T>, "schema" | "reduce"> & {
    key: Data.Definition
    value: Data.Definition
  }
  export const Handler = DictionaryHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return { Handler, config } }
  export function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>) { return new Handler(config) }
}
