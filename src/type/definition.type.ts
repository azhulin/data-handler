import type { HandlerConstructor } from "."
import type { Config } from "../interface"

/**
 * The data definition.
 */
export type Definition = HandlerConstructor | [HandlerConstructor, Config<any>?]
