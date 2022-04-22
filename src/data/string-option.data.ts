import * as Data from ".."
import { $String } from "."

/**
 * The string option data handler class.
 */
class StringOptionHandler extends $String.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".option" }

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<string> = [
    ...this.constraints,
    new Data.Constraint("option", data =>
      this.optionKeys().includes(data)
        ? null
        : [`${this.label} options do not contain the specified value.`, {
            type: this.id,
            options: this.options,
          }],
    ),
  ]

  /**
   * The options.
   */
  protected options: $StringOption.Options = []

  /**
   * {@inheritdoc}
   */
  public constructor(config: $StringOption.Config, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
    if (!this.optionKeys().every(key => super.isValid(key))) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Option keys don't match key type.`)
    }
  }

  /**
   * Returns option keys.
   */
  protected optionKeys(): string[] {
    return StringOptionHandler.optionKeys(this.options)
  }

  /**
   * Returns option keys.
   */
  public static optionKeys(options: $StringOption.Options): string[] {
    return Array.isArray(options) ? options : Object.keys(options)
  }

}

export namespace $StringOption {
  export type Config = $String.Config & {
    options?: Options
  }
  export type Options = string[] | Record<string, string>
  export const Handler = StringOptionHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config = {}) { return { Handler, config } }
  export function init(config: Config = {}) { return new Handler(config) }
}
