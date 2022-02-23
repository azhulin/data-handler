import type { Context } from "../interface";
/**
 * The data processor.
 */
export declare type Processor<T> = (data: T, context: Context) => T | Promise<T>;
export declare namespace Processor {
    type Library = Record<string, Processor<any>>;
}
