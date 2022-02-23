import type { HandlerConstructor } from ".";
import type { Config } from "../interface";
/**
 * The data definition.
 */
export declare type Definition = Definition.Default | Definition.Configured;
export declare namespace Definition {
    interface Default {
        Handler: HandlerConstructor;
    }
    interface Configured extends Default {
        config: Config<any>;
    }
}
