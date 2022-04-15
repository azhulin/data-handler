import type { Operation } from "../enum";
import type { Context } from "../interface";
import type { Property } from "../type";
/**
 * The data default value behaviors configuration.
 */
export declare type Default<T = Value> = {
    [behavior in "value" | "nulled" | "read" | Operation]: Property<T, Context>;
};
declare type Value = null | boolean | number | string | Array<Value> | {
    [key: string]: Value;
};
export {};
