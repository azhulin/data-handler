import { Constraint } from "../component";
/**
 * Generates an inequality constraints.
 */
export declare function inequalityConstraints<T>(id: string, count: (data: T) => number, prefix: string, suffix?: string): {
    eq: (value: number) => Constraint<T>;
    gt: (value: number) => Constraint<T>;
    gte: (value: number) => Constraint<T>;
    lt: (value: number) => Constraint<T>;
    lte: (value: number) => Constraint<T>;
    neq: (value: number) => Constraint<T>;
};
