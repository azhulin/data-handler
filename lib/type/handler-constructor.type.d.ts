import type { Handler } from "../component";
import type { Settings } from "../interface";
/**
 * The handler constructor.
 */
export declare type HandlerConstructor = new (settings: Settings) => Handler;