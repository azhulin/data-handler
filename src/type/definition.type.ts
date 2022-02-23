import type { HandlerConstructor } from "."
import type { Config } from "../interface"

/**
 * The data definition.
 */
export type Definition = Definition.Default | Definition.Configured

export namespace Definition {
  export interface Default {
    Handler: HandlerConstructor
  }
  export interface Configured extends Default {
    config: Config<any>
  }
}
