import type { Config as ConfigBase, Context, Property } from "@azhulin/data-validator";
/**
 * The data handler configuration.
 */
export interface Config extends ConfigBase {
    store?: Property<boolean, Context>;
    output?: Property<boolean, Context>;
}
