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
    ["option", data => this.optionKeys().includes(data)
      ? null
      : [`${this.name} options do not contain the specified value.`, {
        options: this.options instanceof Map
          ? [...this.options.entries()]
          : this.options,
      }],
    ],
  ]

  /**
   * The options.
   */
  protected options: $NumberOption.Options = []

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$NumberOption.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
  }

  /**
   * Returns the option keys.
   *
   * @returns An array of numbers representing the option keys.
   */
  protected optionKeys(): number[] {
    return NumberOptionHandler.optionKeys(this.options)
  }

  /**
   * Returns the option keys of the specified options.
   *
   * @param options - The options.
   *
   * @returns An array of numbers representing the keys of the specified
   *   options.
   */
  public static optionKeys(options: $NumberOption.Options): number[] {
    return Array.isArray(options) ? options : [...options.keys()]
  }

}

/**
 * The number option data handler namespace.
 */
export namespace $NumberOption {
  export type Config = Omit<$Number.Config, "decimals"> & {
    options: Options
  }
  export type Options = number[] | Map<number, string>
  export const Handler = NumberOptionHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config): Data.Definition { return { Handler, config } }
  export function init(config: Config) { return new Handler(config) }
}
