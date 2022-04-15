import type { Context } from "../interface";
/**
 * Constraint component.
 */
export declare class Constraint<T> {
    readonly id: string;
    readonly func: Constraint.Func<T>;
    readonly skip: boolean;
    /**
     * Constructor for the Constraint object.
     */
    constructor(id: string, func: Constraint.Func<T>, skip?: boolean);
    /**
     * Skips constraint run on update operation if the value is not changed.
     */
    skipOnUpdate(skip?: boolean): Constraint<T>;
}
export declare namespace Constraint {
    type Result = null | string | [string, Record<string, unknown>];
    type Func<T> = (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>;
    type Library<T = any> = {
        [key: string]: Constraint<T> | ((...args: any) => Constraint<T>) | Library<T>;
    };
    type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>;
}
