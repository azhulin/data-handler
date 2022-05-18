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
    ["option", data => this.optionKeys().includes(data)
      ? null
      : [`${this.name} options do not contain the specified value.`, {
        options: this.options,
      }],
    ],
  ]

  /**
   * The options.
   */
  protected options: $StringOption.Options = []

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$StringOption.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
  }

  /**
   * Returns the option keys.
   *
   * @returns An array of strings representing the option keys.
   */
  protected optionKeys(): string[] {
    return StringOptionHandler.optionKeys(this.options)
  }

  /**
   * Returns the option keys of the specified options.
   *
   * @param options - The options.
   *
   * @returns An array of strings representing the keys of the specified
   *   options.
   */
  public static optionKeys(options: $StringOption.Options): string[] {
    return Array.isArray(options) ? options : Object.keys(options)
  }

}

/**
 * The string option data handler namespace.
 */
export namespace $StringOption {
  export type Config = $String.Config & {
    options: Options
  }
  export type Options = string[] | Record<string, string>
  export const Handler = StringOptionHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config): Data.Definition { return { Handler, config } }
  export function init(config: Config) { return new Handler(config) }
}
