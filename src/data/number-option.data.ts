import * as Data from ".."
import { $Number } from "."

/**
 * The number option data handler class.
 */
class NumberOptionHandler extends $Number.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".option" }

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<number> = [
    ...this.constraints,
    new Data.Constraint("option", data =>
      this.optionKeys().includes(data)
        ? null
        : [`${this.label} options do not contain the specified value.`, {
            type: this.id,
            options: this.options instanceof Map ? [...this.options.entries()] : this.options,
          }],
    ),
  ]

  /**
   * The options.
   */
  protected options: $NumberOption.Options = []

  /**
   * {@inheritdoc}
   */
  public constructor(config: $NumberOption.Config, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
    if (!this.optionKeys().every(key => super.isValid(key))) {
      throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Option keys don't match key type.`)
    }
  }

  /**
   * Returns option keys.
   */
  protected optionKeys(): number[] {
    return NumberOptionHandler.optionKeys(this.options)
  }

  /**
   * Returns option keys.
   */
  public static optionKeys(options: $NumberOption.Options): number[] {
    return Array.isArray(options) ? options : [...options.keys()]
  }

}

export namespace $NumberOption {
  export interface Config extends Omit<$Number.Config, "decimals"> {
    options: Options
  }
  export type Options = number[] | Map<number, string>
  export const Handler = NumberOptionHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config) { return { Handler, config } }
  export function init(config: Config) { return new Handler(config) }
}
