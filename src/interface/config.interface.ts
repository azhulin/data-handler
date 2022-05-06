import type { Constraint } from "../component"
import type { Context, Default } from "../interface"
import type { Processor, Property } from "../type"

/**
 * The data handler configuration.
 */
export interface Config<T = any> {
  input?: Property<boolean, Context>
  store?: Property<boolean, Context>
  output?: Property<boolean, Context>
  require?: Property<boolean, Context>
  default?: Partial<Default<T>>
  preparers?: Processor.List<unknown>
  preprocessors?: Processor.List<T>
  constraints?: Constraint.List<T>
  postprocessors?: Processor.List<T>
}
