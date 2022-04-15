import type { Context } from "../interface"

/**
 * The data preparer.
 */
export type Preparer = (data: unknown, context: Context) => unknown

export namespace Preparer {
  export type Library = {
    [key: string]: Preparer | ((...args: any) => Preparer) | Library
  }
}
