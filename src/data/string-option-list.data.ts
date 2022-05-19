import * as Data from ".."
import { $List, $StringOption } from "."

/**
 * The string option list data handler class.
 */
class $ extends $List.Handler<string[]> {

  /**
   * {@inheritdoc}
   */
  public static id: string = `${$List.id}.string.option`

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<string[]> = [
    ...this.constraints,
    $List.constraint.items_unique,
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
  }

  /**
   * {@inheritdoc}
   */
  protected getItem(): Data.Definition {
    this.item = this.item ?? $StringOption.conf({
      options: this.options,
    })
    return super.getItem()
  }

}

/**
 * The string option list data handler namespace.
 */
export namespace $StringOptionList {
  export type Config = Omit<$List.Config<string[]>, "item"> & {
    options: $StringOption.Options
    preserve_order?: boolean
  }
  export type Options = $StringOption.Options
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config) { return $.conf($, config) }
  export function init(config: Config) { return $.init($, config) }
}
