import type { Context } from "../interface"

/**
 * The data processor.
 */
export type Processor<T> = (data: T, context: Context) => T | Promise<T>

export namespace Processor {
  export type Library = Record<string, Processor<any>>
}
