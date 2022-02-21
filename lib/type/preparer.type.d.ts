import type { Context } from "../interface";
/**
 * The data preparer.
 */
export declare type Preparer<T> = (data: unknown, context: Context) => T;
export declare namespace Preparer {
    type Library = Record<string, Preparer<any>>;
}
