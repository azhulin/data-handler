import type { Context } from "../interface"

/**
 * The data preparer.
 */
export type Preparer<T> = (data: any, context: Context) => T

export namespace Preparer {
  export type Library = Record<string, Preparer<any>>
}
