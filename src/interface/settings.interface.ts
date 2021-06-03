import type { Settings as SettingsBase } from "@azhulin/data-validator"
import type { Config } from "."

/**
 * The data handler settings.
 */
export interface Settings extends SettingsBase {
  config?: Config
}
