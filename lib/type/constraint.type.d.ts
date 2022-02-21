import type { Context } from "../interface";
/**
 * The data constraint.
 */
export declare type Constraint<T> = [
    string,
    (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>,
    boolean?
];
export declare namespace Constraint {
    type Result = null | string | [string, Record<string, unknown>];
    type Library = {
        [key: string]: Constraint<any> | ((...args: any) => Constraint<any>) | Library;
    };
    type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>;
}
