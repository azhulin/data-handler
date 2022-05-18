import * as Data from ".."
import { $List, $StringOption } from "."

/**
 * The string option list data handler class.
 */
class StringOptionListHandler extends $List.Handler<string[]> {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<string[]> = [
    ...this.constraints,
    $List.constraint.unique,
  ]

  /**
   * {@inheritdoc}
   */
  protected postprocessors: Data.Processor.List<string[]> = [
    data => {
      if (this.preserve_order) {
        return data
      }
      const keys = $StringOption.Handler.optionKeys(this.options)
      return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    }
  ]

  /**
   * The options.
   */
  protected options: $StringOption.Options = []

  /**
   * Whether to preserve the original order of option items.
   */
  protected preserve_order: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(config: Partial<$StringOptionList.Config>, settings?: Data.Settings) {
    super(config, settings)
    this.options = config.options ?? this.options
    this.preserve_order = config.preserve_order ?? this.preserve_order
    this.item = $StringOption.conf({
      options: this.options,
    })
  }

}

/**
 * The string option list data handler namespace.
 */
export namespace $StringOptionList {
  export type Config<T = string[]> = Omit<$List.Config<T>, "item"> & {
    options: $StringOption.Options
    preserve_order?: boolean
  }
  export const Handler = StringOptionListHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config): Data.Definition { return { Handler, config } }
  export function init(config: Config) { return new Handler(config) }
}
