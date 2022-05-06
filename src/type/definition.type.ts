import type { Handler } from "../component"
import type { Config, Settings } from "../interface"

/**
 * The data definition.
 *
 * The data definitions is an object containing the data handler constructor and
 * optionally the data handler configuration.
 */
export type Definition = Definition.Default | Definition.Configured

export namespace Definition {
  export interface Default {
    Handler: new (config: any, settings?: Settings) => Handler
  }
  export interface Configured extends Default {
    config: Config
  }
}
