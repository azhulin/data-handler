import type { BaseContext } from "."
import type { Validator } from "../component"
import type { Operation } from "../enum"
import type { Path } from "../type"

/**
 * The data context.
 */
export interface Context extends BaseContext {
  operation: Operation
  create: boolean
  update: boolean
  integrate: boolean
  handler: Validator
  path: Path
  source: (field?: string) => unknown
  result: (field?: string) => unknown
  original: (field?: string) => unknown
  storage: (key: string, value?: unknown) => unknown
}
