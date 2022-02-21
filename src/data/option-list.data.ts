import * as Data from ".."
import { $List, $Option } from "."

export namespace $OptionList {
  export type Config<T extends null | (number | string)[]> = Data.Config<T> & {
    key_type?: $Option.KeyType
    options?: $Option.Options
    preserve?: boolean
  }
}

/**
 * The option list data handler class.
 */
export class $OptionList<T extends null | (number | string)[]> extends $List<T> {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint.List<NonNullable<T>> = [
    ...this.constraints,
    $List.constraint.unique,
  ]

  /**
   * {@inheritdoc}
   */
  public static processor = {
    ...$List.processor,
    order: <T extends any[]>(data: T, { handler }: Data.Context): T => {
      const keys = $Option.optionKeys((<$OptionList<T>>handler).options)
      type Key = typeof keys[0]
      return data.sort((a: Key, b: Key) => keys.indexOf(a) - keys.indexOf(b))
    }
  }

  /**
   * The options.
   */
  protected options: $Option.Options = []

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
      config: <$List.Config<T>>{
        ...settings.config,
        item: $Option.conf({
          key_type: (settings.config as $Option.Config<any>).key_type,
          options: (settings.config as $Option.Config<any>).options,
        }),
      },
    })
    const config = (settings.config ?? {}) as $OptionList.Config<T>
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push($OptionList.processor.order)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $OptionList.Config<(number | string)[]>): Data.Definition {
    return [$OptionList, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | (number | string)[] = (number | string)[]>(config?: $OptionList.Config<T>): $OptionList<T> {
    return new $OptionList<T>({ config })
  }

}
