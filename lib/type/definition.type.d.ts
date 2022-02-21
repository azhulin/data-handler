import type { HandlerConstructor } from ".";
import type { Config } from "../interface";
/**
 * The data definition.
 */
export declare type Definition = HandlerConstructor | [HandlerConstructor, Config<any>?];
