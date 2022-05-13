import type { Handler } from "../component"
import type { Config, Settings } from "../interface"

/**
 * The data definition.
 *
 * The data definition is an object containing the data handler constructor and
 * optionally the data configuration, and is used for describing nested data
 * handlers in data configuration of such data handlers as List, Object, and
 * Dictionary.
 */
export interface Definition {

  /**
   * The data handler constructor.
   */
  Handler: new (config: any, settings?: Settings) => Handler

  /**
   * The data configuration.
   */
  config?: Config

}
