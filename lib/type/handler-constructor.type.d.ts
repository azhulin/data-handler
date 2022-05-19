import type { Handler } from "../component";
import type { Settings } from "../interface";
/**
 * The data handler constructor.
 */
export declare type HandlerConstructor<T = any> = new (config: any, settings?: Settings) => Handler<T>;
