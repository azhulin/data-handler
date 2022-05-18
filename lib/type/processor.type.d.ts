import type { Context } from "../interface";
/**
 * The data processor.
 *
 * The data processor is a synchronous or asynchronous function for processing
 * a data depending on the data context.
 *
 * @param data - The data to process.
 * @param context - The data context.
 *
 * @returns Processed data, or a promise that resolves with processed data.
 *
 * @example
 * <number>
 *   (data, context) => context.create ? data + 1 : data - 1
 *
 * @example
 * <string>
 *   data => data.trim()
 */
export declare type Processor<T> = (data: T, context: Context) => T | Promise<T>;
/**
 * The data processor namespace.
 */
export declare namespace Processor {
    /**
     * The data processor factory.
     *
     * The data processor factory is a function that accepts some arguments and
     * returns a data processor that depends on these arguments.
     *
     * @param args - The data processor factory arguments.
     *
     * @returns A data processor.
     *
     * @example
     * <string>
     *   (arg: number) =>
     *     data => data.substring(0, arg)
     */
    type Factory<T> = (...args: any) => Processor<T>;
    /**
     * The data processor library.
     *
     * The data processor library is an object containing the data processors,
     * data processor factories, or another data processor libraries.
     *
     * @example
     * <number>{
     *   processor1: data => data + 1,
     *   factory1: (arg: number) =>
     *     data => data + arg,
     *   library1: {
     *     processor2: (data, context) => context.create ? data + 2 : data - 2,
     *     factory2: (arg1: boolean, arg2: number) =>
     *       data => arg1 ? data + arg2 : data - arg2,
     *     library2: {
     *       ...
     *     },
     *   }
     * }
     */
    export type Library<T> = {
        [key: string]: Processor<T> | Factory<T> | Library<T>;
    };
    /**
     * The data processor list factory.
     *
     * The data processor list factory is a function that accepts the data context
     * as an argument and returns an array of data processors.
     *
     * @param context - The data context.
     *
     * @returns An array of data processors.
     *
     * @example
     * <string>
     *   context => context.update ? [] : [
     *     data => data.trim(),
     *     data => data.replace("a", "A"),
     *   ]
     */
    type ListFactory<T> = (context: Context) => Processor<T>[];
    /**
     * The data processor list.
     *
     * The data processor list is an array of data processors and data processor
     * list factories. Note that a data processor list factory must be enclosed in
     * square brackets (this allows typescript to distinguish between a data
     * processor function and a data processor list factory function without
     * specifying the type).
     *
     * @example
     * <string>[
     *   (data, context) => context.create ? data + "a" : data,
     *   [context => context.update ? [] : [
     *     data => data.trim(),
     *     data => data.replace("a", "A"),
     *   ]],
     * ]
     */
    export type List<T> = Array<Processor<T> | [ListFactory<T>]>;
    export {};
}
