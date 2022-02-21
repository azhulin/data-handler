import { Context } from "."
import { Constraint, Default, Preparer, Processor, Property } from "../type"

/**
 * The data handler configuration.
 */
export interface Config<T> {
  input?: Property<boolean, Context>
  store?: Property<boolean, Context>
  output?: Property<boolean, Context>
  require?: Property<boolean, Context>
  default?: Partial<Default<T>>
  preparers?: Preparer<T>[]
  preprocessors?: Processor<NonNullable<T>>[]
  constraints?: Constraint.List<NonNullable<T>>
  postprocessors?: Processor<NonNullable<T>>[]
}
