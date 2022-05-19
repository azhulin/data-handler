import type { Config } from "../interface";
import type { HandlerConstructor } from "../type";
/**
 * The data definition.
 *
 * The data definition is an object containing the data handler constructor and
 * optionally the data configuration, and is used for describing nested data
 * handlers in data configuration of such data handlers as List, Object, and
 * Dictionary.
 */
export interface Definition<T = any> {
    /**
     * The data handler constructor.
     */
    Handler: HandlerConstructor;
    /**
     * The data configuration.
     */
    config?: Config<T>;
}
