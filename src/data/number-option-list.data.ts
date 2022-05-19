import * as Data from ".."
import { $List, $NumberOption } from "."

/**
 * The number option list data handler class.
 */
class $ extends $List.Handler<number[]> {

  /**
   * {@inheritdoc}
   */
  public static id: string = `${$List.id}.number.option`

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<number[]> = [
    ...this.constraints,
    $List.constraint.items_unique,
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
  }

  /**
   * {@inheritdoc}
   */
  protected getItem(): Data.Definition {
    this.item = this.item ?? $NumberOption.conf({
      options: this.options,
    })
    return super.getItem()
  }

}

/**
 * The number option list data handler namespace.
 */
export namespace $NumberOptionList {
  export type Config = Omit<$List.Config<number[]>, "item"> & {
    options: $NumberOption.Options
    preserve_order?: boolean
  }
  export type Options = $NumberOption.Options
  export const Handler = $
  export const { id, constraint, preparer, processor } = $
  export function conf(config: Config) { return $.conf($, config) }
  export function init(config: Config) { return $.init($, config) }
}
