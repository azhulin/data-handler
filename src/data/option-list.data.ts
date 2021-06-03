import * as Data from ".."
import { $List, $Option } from ".."

export type Config = $Option.Config & {
  preserve?: boolean
}

/**
 * The option list data handler class.
 */
export class Handler extends $List.Handler {

  /**
   * {@inheritdoc}
   */
  protected constraints: Data.Constraint[] = [...this.constraints, "unique"]

  /**
   * {@inheritdoc}
   */
  protected processorLibrary: Data.Processor.Library = {
    ...this.processorLibrary,
    order: (data: $Option.Keys): $Option.Keys => {
      const keys = $Option.Handler.optionKeys(this.options)
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
      config: <$List.Config>{
        ...settings.config,
        item: $Option.conf({
          key_type: (settings.config as $Option.Config).key_type,
          options: (settings.config as $Option.Config).options,
        }),
      },
    })
    const config: Config = settings.config ?? {}
    this.options = config.options ?? this.options
    this.preserve = config.preserve ?? this.preserve
    this.preserve || this.postprocessors.push("order")
  }

}

export function conf(config?: Config) { return { ...config, Handler } }
export function init(config?: Config) { return new Handler({ config }) }
