import * as Data from ".."
import * as List from "./List"
import * as Option from "./Option"

export type Config = Option.Config & {
  preserve?: boolean
}

/**
 * The option list data handler class.
 */
export default class OptionList extends List.Handler {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint[] = [...this.constraints, "unique"]

  /**
   * {@inheritdoc}
   */
  protected processorLibrary: Data.Processor.Library = {
    ...this.processorLibrary,
    order: (data: Option.Keys): Option.Keys => {
      const keys = Option.Handler.optionKeys(this.options)
      type Key = typeof keys[0]
      return data.sort((a: Key, b: Key) => keys.indexOf(a) - keys.indexOf(b))
    }
  }

  /**
   * The options.
   */
  protected options: Option.Options = []

  /**
   * Whether to keep the items order from the input.
   */
  protected preserve: boolean = false

  /**
   * {@inheritdoc}
   */
  public constructor(settings: Data.Settings) {
    super({
      ...settings,
      config: {
        ...settings.config,
        item: {
          type: "Option",
          key_type: (settings.config as Option.Config).key_type,
          options: (settings.config as Option.Config).options,
        },
      } as List.Config
    })
    const config = settings.config as Config
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push("order")
  }

}

export { OptionList as Handler }
