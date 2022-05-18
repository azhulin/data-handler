import type { Context } from "../interface"

/**
 * The data constraint.
 *
 * The data constraint is used to check the limitations or restrictions of a
 * data of specific type.
 */
export type Constraint<T> = [

  /**
   * The data constraint ID.
   *
   * The data constraint ID is a unique within a data type identifier of the
   * data constraint.
   */
  string,

  /**
   * The data constraint function.
   *
   * The data constraint function is a synchronous or asynchronous function to
   * check the limitations or restrictions of a data of specific type depending
   * on the data context.
   */
  Constraint.Func<T>,

  /**
   * The data constraint skippable flag.
   *
   * The data constraint skippable flag is a flag indicating whether the data
   * constraint check must be skipped during validation in `update` data mode,
   * if the new data value is equal to the original data value. Is `false` by
   * default.
   */
  boolean?,
]

/**
 * The data constraint namespace.
 */
export namespace Constraint {

  /**
   * The data constraint result.
   *
   * The data constraint result is a value that represents a result of the data
   * constraint check. If the data constraint check passed, the data constraint
   * result is `null`, otherwise, the data constraint check failed, and the data
   * constraint result can be either a message, describing the reason of the
   * data constraint check fail, or an array of two elements, where the first
   * one is the message, and the second one is a free-form object containing the
   * information about the data constraint check fail.
   *
   * @example
   * null
   *
   * @example
   * "The value must be trimmed."
   *
   * @example
   * ["The list can not contain more that 10 items.", { max_size: 10 }]
   */
  type Result = null | string | [string, Record<string, unknown>]

  /**
   * The data constraint function.
   *
   * The data constraint function is a synchronous or asynchronous function to
   * check the limitations or restrictions of a data of specific type depending
   * on the data context.
   *
   * @param data - The data to check a limit or restriction.
   * @param context - The data context.
   *
   * @returns A data constraint result, or a promise that resolves with a data
   *   constraint result.
   *
   * @example
   * <number>
   *   (data, context) => context.create && 10 < data
   *     ? ["The new value can not be greater than 10.", { max: 10 }]
   *     : null
   *
   * @example
   * <string>
   *   data => data !== data.trim() ? "The value must be trimmed." : null
   */
  export type Func<T> = (data: T, context: Context) => Result | Promise<Result>

  /**
   * The data constraint factory.
   *
   * The data constraint factory is a function that accepts some arguments and
   * returns a data constraint that depends on these arguments.
   *
   * @param args - The data constraint factory arguments.
   *
   * @returns A data constraint.
   *
   * @example
   * <string>
   *   (arg: number) => [
   *     "max_length",
   *     data => arg < data.length
   *       ? [`String length can not be greater than ${arg}.`, { max_length: arg }]
   *       : null,
   *   ]
   */
  type Factory<T> = (...args: any[]) => Constraint<T>

  /**
   * The data constraint library.
   *
   * The data constraint library is an object containing the data constraints,
   * data constraint factories, or another data constraint libraries.
   *
   * @example
   * <number>{
   *   constraint1: [
   *     "constraint1",
   *     data => 100 < data ? "Value can not be greater than 100." : null,
   *   ],
   *   factory1: (arg: number) => [
   *     "factory1",
   *     data => arg > data
   *       ? [`Value can not be lesser than ${arg}.`, { min: arg }]
   *       : null,
   *   ],
   *   library1: {
   *     constraint2: [
   *       "constraint2",
   *       (data, context) => context.update && 0 === data
   *         ? "The value can not be updated into 0."
   *         : null,
   *     ],
   *     factory2: (arg1: boolean, arg2: number) => [
   *       "factory2",
   *       data => arg1 !== (data === arg2) ? "Invalid value." : null,
   *     ],
   *     library2: {
   *       ...
   *     },
   *   }
   * }
   */
  export type Library<T> = {
    [key: string]: Constraint<T> | Factory<T> | Library<T>
  }

  /**
   * The data constraint list factory.
   *
   * The data constraint list factory is a function that accepts the data
   * context as an argument and returns an array of data constraints.
   *
   * @param context - The data context.
   *
   * @returns An array of data constraints.
   *
   * @example
   * <string>
   *   context => context.update ? [] : [
   *     [
   *       "constraint1",
   *       data => data !== data.trim() ? "The value must be trimmed." : null,
   *     ],
   *     [
   *       "constraint2",
   *       data => 10 > data.length
   *         ? ["String length can not be lesser than 10.", { min_length: 10 }]
   *         : null,
   *     ],
   *   ]
   */
  type ListFactory<T> = (context: Context) => Constraint<T>[]

  /**
   * The data constraint list.
   *
   * The data constraint list is an array of data constraints and data
   * constraint list factories. To set a skippable flag for a data constraint
   * taken from the data handler's data constraint library, the data constraint
   * can be enclosed in square brackets.
   *
   * @example
   * <string>[
   *   [
   *     "constraint1",
   *     (data, context) => context.update && !data.startsWith("ABC")
   *       ? "Updated value must start with 'ABC'."
   *       : null,
   *   ],
   *   $String.constraint.length.gt(10),
   *   [$String.constraint.trimmed],
   *   context => context.update ? [] : [
   *     [
   *       "constraint2",
   *       data => data !== data.trim() ? "The value must be trimmed." : null,
   *     ],
   *     [
   *       "constraint3",
   *       data => 10 > data.length
   *         ? ["String length can not be lesser than 10.", { min_length: 10 }]
   *         : null,
   *     ],
   *   ],
   * ]
   */
  export type List<T> = Array<Constraint<T> | [Constraint<T>] | ListFactory<T>>

}
