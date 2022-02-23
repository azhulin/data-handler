import type { Constraint } from "../component";
import type { Context } from ".";
import type { Default, Preparer, Processor, Property } from "../type";
/**
 * The data handler configuration.
 */
export interface Config<T = any> {
    input?: Property<boolean, Context>;
    store?: Property<boolean, Context>;
    output?: Property<boolean, Context>;
    require?: Property<boolean, Context>;
    default?: Partial<Default<null | T>>;
    preparers?: Preparer<T>[];
    preprocessors?: Processor<T>[];
    constraints?: Constraint.List<T>;
    postprocessors?: Processor<T>[];
}
