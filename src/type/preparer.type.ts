import type { Context } from "../interface"

/**
 * The data preparer.
 */
export type Preparer<T> = (data: unknown, context: Context) => T

export namespace Preparer {
  export type Library = Record<string, Preparer<any>>
}
