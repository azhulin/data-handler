import type { Handler } from "../component";
import type { Config, Settings } from "../interface";
/**
 * The data definition.
 */
export declare type Definition = Definition.Default | Definition.Configured;
export declare namespace Definition {
    interface Default {
        Handler: new (config: any, settings?: Settings) => Handler;
    }
    interface Configured extends Default {
        config: Config;
    }
}
