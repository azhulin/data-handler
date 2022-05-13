import type { Default } from "../interface"
import type { Constraint, Processor, Property } from "../type"

/**
 * The data configuration.
 *
 * The data configuration is an object that is used to configure the data
 * handler. It allows to override data properties and data default value
 * behaviors, add data processors and data constraints, provide other derived
 * configuration. The data handler can be configured in different ways:
 * - instantiate the data handler passing the data configuration to the `init`
 *   function from the data handler namespace;
 * - create a data definition passing the data configuration to the `conf`
 *   function from the data handler namespace;
 * - instantiate the data handler using `new` operator and passing the data
 *   configuration to the constructor;
 * - manually create a data definition.
 * This is a default data configuration that each data handler can extend or
 * reduce. When extending a data handler, it is recommended to extend its data
 * configuration as well.
 *
 * @see Validator#constructor
 * @see Definition
 */
export interface Config<T = any> {

  /**
   * The `input` data property.
   *
   * The data handler `input` data property override.
   *
   * @see Validator#input
   */
  input?: Property<boolean>

  /**
   * The `require` data property.
   *
   * The data handler `require` data property override.
   *
   * @see Validator#require
   */
  require?: Property<boolean>

  /**
   * The `store` data property.
   *
   * The data handler `store` data property override.
   *
   * @see Handler#store
   */
  store?: Property<boolean>

  /**
   * The `output` data property.
   *
   * The data handler `output` data property override.
   *
   * @see Handler#output
   */
  output?: Property<boolean>

  /**
   * The data default value behaviors.
   *
   * The data handler data default value behaviors override.
   *
   * @see Validator#default
   */
  default?: Partial<Default<T>>

  /**
   * The data preparers.
   *
   * The data handler additional data preparers.
   *
   * @see Validator#preparers
   */
  preparers?: Processor.List<unknown>

  /**
   * The data preprocessors.
   *
   * The data handler additional data preprocessors.
   *
   * @see Validator#preprocessors
   */
  preprocessors?: Processor.List<T>

  /**
   * The data constraints.
   *
   * The data handler additional data constraints.
   *
   * @see Validator#constraints
   */
  constraints?: Constraint.List<T>

  /**
   * The data postprocessors.
   *
   * The data handler additional data postprocessors.
   *
   * @see Validator#postprocessors
   */
  postprocessors?: Processor.List<T>

}
