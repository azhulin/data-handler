import type { Context } from "../interface"

/**
 * The data constraint.
 */
export type Constraint<T> = [
  string,
  (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>,
  boolean?,
]

export namespace Constraint {
  export type Result = null | string | [string, Record<string, unknown>]
  export type Library = {
    [key: string]: Constraint<any> | ((...args: any) => Constraint<any>) | Library
  }
  export type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>
}
