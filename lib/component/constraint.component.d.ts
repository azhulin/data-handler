import type { Context } from "../interface";
/**
 * Constraint component.
 */
export declare class Constraint<T> {
    readonly id: string;
    readonly func: Constraint.Func<T>;
    skip: boolean;
    /**
     * Constructor for the Constraint object.
     */
    constructor(id: string, func: Constraint.Func<T>, skip?: boolean);
    /**
     * Sets skip on update flag.
     */
    skipOnUpdate(skip?: boolean): Constraint<T>;
}
export declare namespace Constraint {
    type Result = null | string | [string, Record<string, unknown>];
    type Func<T> = (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>;
    type Library = {
        [key: string]: Constraint<any> | ((...args: any) => Constraint<any>) | Library;
    };
    type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>;
}