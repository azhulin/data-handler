import * as Data from ".."
import { $List, $NumberOption } from "."

/**
 * The number option list data handler class.
 */
class NumberOptionListHandler extends $List.Handler {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<number[]> = [
    ...this.constraints,
    $NumberOptionList.constraint.unique,
  ]

  /**
   * {@inheritdoc}
   */
  public static processor = {
    ...$List.Handler.processor,
    order: <Data.Processor<number[]>>((data, { handler }) => {
      const keys = $NumberOption.Handler.optionKeys((<NumberOptionListHandler>handler).options)
      return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    })
  }

  /**
   * The options.
   */
  protected options: $NumberOption.Options = []

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
        item: $NumberOption.conf({
          options: (settings.config as $NumberOption.Config).options,
        }),
      },
    })
    const config = (settings.config ?? {}) as $NumberOptionList.Config
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push($NumberOptionList.processor.order)
  }

}

export namespace $NumberOptionList {
  export type Config<T extends any[] = number[]> = Omit<$List.Config<T>, "item"> & {
    options: $NumberOption.Options
    preserve?: boolean
  }
  export const Handler = NumberOptionListHandler
  export const constraint = Handler.constraint
  export const preparer = Handler.preparer
  export const processor = Handler.processor
  export function conf(config: Config) { return { Handler, config } }
  export function init(config: Config) { return new Handler({ config }) }
}
