import type { Context } from "../interface"

/**
 * The data processor.
 */
export type Processor<T> = (data: T, context: Context) => T | Promise<T>

export namespace Processor {
  export type Library<T = any> = {
    [key: string]: Processor<T> | ((...args: any) => Processor<T>) | Library<T>
  }
}
