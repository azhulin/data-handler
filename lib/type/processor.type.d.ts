import type { Context } from "../interface";
/**
 * The data processor.
 */
export declare type Processor<T> = (data: T, context: Context) => T | Promise<T>;
export declare namespace Processor {
    type Library<T = any> = {
        [key: string]: Processor<T> | ((...args: any) => Processor<T>) | Library<T>;
    };
}
