import type { Validator } from "../component"
import type { Mode } from "../enum"
import type { ErrorExpected } from "../error"
import type { Options } from "../interface"
import type { FieldRelative, Path } from "../type"

/**
 * The data context.
 *
 * The data context is an object containing the information about the current
 * data formatting run of the data handler and can be accessed from the data
 * constraints, preparers, processors, and properties. The data context extends
 * the data options passed to the data handler's formatting method.
 */
export interface Context extends Options {

  /**
   * The data mode.
   */
  mode: Mode

  /**
   * The shortcut for the `create` data mode.
   */
  create: boolean

  /**
   * The shortcut for the `update` data mode.
   */
  update: boolean

  /**
   * The data handler instance.
   */
  handler: Validator

  /**
   * The data path.
   * See {@link Validator#path}.
   */
  path: Path

  /**
   * The data warnings.
   * See {@link Validator#warnings}.
   */
  warnings: ErrorExpected[]

  /**
   * Returns the field value from the source data.
   * See {@link Validator#source}.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns The field value from the source data.
   */
  source: <T = unknown>(field?: FieldRelative) => T

  /**
   * Returns the field value from the result data.
   * See {@link Validator#result}.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns The field value from the result data.
   */
  result: <T = unknown>(field?: FieldRelative) => T

  /**
   * Returns the field value from the original data.
   *
   * The original data is the data that is provided with the data options in
   * `update` data mode.
   * See {@link Options#data}.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns The field value from the original data.
   */
  original: <T = unknown>(field?: FieldRelative) => T

  /**
   * Reads a value from the data storage or writes a value to the data storage.
   * See {@link Validator#storage}.
   *
   * @param key - If the value argument is omitted, the data storage key to read
   *   the value from. If the value argument is specified, the data storage key
   *   to write the value to.
   * @param value - The value to write to the data storage.
   *
   * @returns The value from the data storage under the specified data storage
   *   key.
   */
  storage: <T = unknown>(key: string, value?: T) => T

}
