import type { Config, Definition } from ".";
import type { Handler } from "../component";
/**
 * The data handler.
 */
export interface $Handler extends Definition {
    conf(config?: Config): Definition;
    init(config?: Config): Handler;
}
