import * as Data from ".."
import { $List, $StringOption } from "."

/**
 * The string option list data handler class.
 */
class StringOptionListHandler extends $List.Handler {

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
  public static processor = {
    ...$List.processor,
    order: <Data.Processor<string[]>>((data, { handler }) => {
      const keys = $StringOption.Handler.optionKeys((<StringOptionListHandler>handler).options)
      return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    })
  }

  /**
   * The options.
   */
  protected options: $StringOption.Options = []

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
      config: <$List.Config>{
        ...settings.config,
        item: $StringOption.conf({
          options: (settings.config as $StringOption.Config).options,
        }),
      },
    })
    const config = (settings.config ?? {}) as $StringOptionList.Config
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push($StringOptionList.processor.order)
  }

}

export namespace $StringOptionList {
  export type Config<T extends any[] = string[]> = Omit<$List.Config<T>, "item"> & {
    options: $StringOption.Options
    preserve?: boolean
  }
  export const Handler = StringOptionListHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config) { return { Handler, config } }
  export function init(config: Config) { return new Handler({ config }) }
}
