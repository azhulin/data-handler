import type { Validator } from "../component"
import type { Operation } from "../enum"
import type { Options } from "../interface"
import type { Path } from "../type"

/**
 * The data context.
 */
export interface Context extends Options {
  operation: Operation
  create: boolean
  update: boolean
  handler: Validator
  path: Path
  source: (field?: string) => unknown
  result: (field?: string) => unknown
  original: (field?: string) => unknown
  storage: (key: string, value?: unknown) => unknown
}
