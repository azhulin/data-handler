import * as Data from ".."
import { $Object } from "."

/**
 * The dictionary data handler class.
 */
class $<T> extends $Object.Handler<T> {

  /**
   * {@inheritdoc}
   */
  public static id: string = `${$Object.id}.dictionary`

  /**
   * {@inheritdoc}
   */
  public name: string = "Dictionary"

  /**
   * {@inheritdoc}
   */
  public static constraint = {
    ...$Object.constraint,
    items_number: Data.inequalityConstraints<Record<string, unknown>>(
      `${$.id}:items_number`,
      data => Object.keys(data).length,
      "Number of dictionary items",
    ),
  }

  /**
   * {@inheritdoc}
   */
  protected warnExtraKeys: boolean = false

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
  public constructor(config: Partial<$Dictionary.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.schema = {}
    this.key = config.key ?? this.key
    this.value = config.value ?? this.value
  }

  /**
   * {@inheritdoc}
   *
   * @throws {@link Data.ErrorConstraint}
   * Thrown if dictionary key failed validation.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if unexpectted error occured during dictionary key validation.
   */
  protected async convert(format: Data.Format, data: any, context: Data.Context): Promise<any> {
    const result: Record<string, unknown> = {}
    this.result = Data.set(this.result, this.path, result)
    const keyHandler = this.initHandler(this.getKey())
    const valueDefinition = this.getValue()
    for (const [dataKey, dataValue] of Object.entries(data)) {
      let key
      try {
        key = await keyHandler.in(this.format, dataKey).to(format, context)
      }
      catch (error) {
        if (error instanceof Data.ErrorExpected) {
          const { type, message, details } = error
          throw new Data.ErrorConstraint(this, `${$.id}:key_valid`, "Object key is invalid.", {
            key: { value: dataKey, error: { type, message, details } },
          })
        }
        throw error
      }
      if ("string" === typeof key) {
        const valueHandler = this.initHandler(valueDefinition, [...this.path, dataKey])
        const value = await valueHandler.in(this.format, dataValue).to(format, context)
        undefined !== value && (result[key] = value)
      }
    }
    return result
  }

  /**
   * Returns the dictionary key data definition.
   *
   * @returns Dictionary key data definition.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `key` data handler property is missing.
   */
  protected getKey(): Data.Definition {
    if (!this.key) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'key' property.`)
    }
    return this.key
  }

  /**
   * Returns the dictionary value data definition.
   *
   * @returns Dictionary value data definition.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `value` data handler property is missing.
   */
  protected getValue(): Data.Definition {
    if (!this.value) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'value' property.`)
    }
    return this.value
  }

}

/**
 * The dictionary data handler namespace.
 */
export namespace $Dictionary {
  export type Config<T = any> = Omit<$Object.Config<T>, "schema"> & {
    key: Data.Definition
    value: Data.Definition
  }
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf<T extends Record<string, unknown>>(config: Config<T>) { return $.conf($, config) }
  export function init<T extends Record<string, unknown>>(config: Config<T>) { return $.init<T>($, config) }
}
