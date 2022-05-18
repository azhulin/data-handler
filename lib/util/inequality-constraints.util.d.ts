import { Constraint } from "../type";
/**
 * Generates an inequality data constraint library.
 *
 * Inequality data constraint library provides a set of data constraints for
 * comparison of a numeric data attribute with some numeric value.
 *
 * @param key - The left side of the generated inequality data constraint
 *   identifiers. For example, if the key is `length`, one of the genereted data
 *   constaint identifiers might look like this: `length>10`.
 * @param count - A function to retrieve a numeric data attribute for the
 *   comparison. For example, for strings and arrays it can be a length, for
 *   numbers it can be the number itself.
 * @param prefix - The prefix of the data constraint error message. For example,
 *   if the prefix is `Length`, one of the genereted data constaint error
 *   messages might look like this: `Length must be equal to 10.`.
 * @param suffix - The suffix of the data constraint error message. For example,
 *   if the prefix is `Age`, and the suffix is `years old`, one of the genereted
 *   data constaint error messages might look like this: `Age must be equal to
 *   10 years old.`.
 *
 * @returns A data constraint library object.
 *
 * @see Constraint.Library
 */
export declare function inequalityConstraints<T>(key: string, count: (data: T) => number, prefix: string, suffix?: string): {
    eq: (value: number) => Constraint<T>;
    gt: (value: number) => Constraint<T>;
    gte: (value: number) => Constraint<T>;
    lt: (value: number) => Constraint<T>;
    lte: (value: number) => Constraint<T>;
    neq: (value: number) => Constraint<T>;
};
