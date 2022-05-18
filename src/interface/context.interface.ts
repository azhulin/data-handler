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
 * properties, processors, and constraints. The data context extends the data
 * options passed to the data handler's formatting method.
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
   *
   * @see Validator#path
   */
  path: Path

  /**
   * The data warnings.
   *
   * @see Validator#warnings
   */
  warnings: ErrorExpected[]

  /**
   * Reads a value from the data storage or writes a value to the data storage.
   *
   * @param key - If the value argument is omitted, the data storage key to read
   *   the value from. If the value argument is specified, the data storage key
   *   to write the value to.
   * @param value - The value to write to the data storage.
   *
   * @returns A value from the data storage under the specified data storage
   *   key.
   *
   * @see Validator#storage
   */
  storage: <T>(key: string, value?: T) => T

  /**
   * Returns a field value from the source data.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns A field value from the source data.
   *
   * @see Validator#source
   */
  source: <T>(field?: FieldRelative) => T

  /**
   * Returns a field value from the result data.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns A field value from the result data.
   *
   * @see Validator#result
   */
  result: <T>(field?: FieldRelative) => T

  /**
   * Returns a field value from the original data.
   *
   * The original data is the data that is provided with the data options in
   * `update` data mode.
   *
   * @param field - The relative data field. If omitted, the value under the
   *   current path is returned.
   *
   * @returns A field value from the original data.
   *
   * @see Options#data
   */
  original: <T>(field?: FieldRelative) => T

}
