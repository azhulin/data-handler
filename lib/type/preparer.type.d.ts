import type { Context } from "../interface";
/**
 * The data preparer.
 */
export declare type Preparer = (data: unknown, context: Context) => unknown;
export declare namespace Preparer {
    type Library = {
        [key: string]: Preparer | ((...args: any) => Preparer) | Library;
    };
}
