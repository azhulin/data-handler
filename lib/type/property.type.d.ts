import type { Context } from "../interface";
/**
 * The data property.
 *
 * The data property is a value of a certain type (static data property) or a
 * synchronous or asynchronous function that returns a value of a certain type
 * that depends on a data context argument (dynamic data property).
 */
export declare type Property<T> = Property.Static<T> | Property.Dynamic<T>;
/**
 * The data property namespace.
 */
export declare namespace Property {
    /**
     * The static data property.
     */
    type Static<T> = T;
    /**
     * The dynamic data property.
     */
    type Dynamic<T> = (context: Context) => T | Promise<T>;
}
