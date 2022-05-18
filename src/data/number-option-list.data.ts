import * as Data from ".."
import { $List, $NumberOption } from "."

/**
 * The number option list data handler class.
 */
class NumberOptionListHandler extends $List.Handler<number[]> {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<number[]> = [
    ...this.constraints,
    $List.constraint.unique,
  ]

  /**
   * {@inheritdoc}
   */
  protected postprocessors: Data.Processor.List<number[]> = [
    data => {
      if (this.preserve_order) {
        return data
      }
      const keys = $NumberOption.Handler.optionKeys(this.options)
      return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    }
  ]

  /**
   * The options.
   */
  protected options: $NumberOption.Options = []

  /**
   * Whether to preserve the original order of option items.
   */
  protected preserve_order: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$NumberOptionList.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
    this.preserve_order = config.preserve_order ?? this.preserve_order
    this.item = $NumberOption.conf({
      options: this.options,
    })
  }

}

/**
 * The number option list data handler namespace.
 */
export namespace $NumberOptionList {
  export type Config<T = number[]> = Omit<$List.Config<T>, "item"> & {
    options: $NumberOption.Options
    preserve_order?: boolean
  }
  export const Handler = NumberOptionListHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config): Data.Definition { return { Handler, config } }
  export function init(config: Config) { return new Handler(config) }
}
