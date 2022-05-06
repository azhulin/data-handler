import type { ErrorExpected } from "../error"
import type { Path } from "../type"

/**
 * The data settings.
 *
 * The data settings is an object that is used to initialize the dependent data
 * handler, passing the data path and shared settings from the host data handler
 * to the dependend data handler. For example, the `Object` data handler
 * initializes the dependent data handlers described in its schema.
 * See {@link Validator}.
 */
export interface Settings {

  /**
   * The data path.
   *
   * See {@link Validator#path}.
   */
  path: Path

  /**
   * The data warnings.
   *
   * See {@link Validator#warnings}.
   */
  warnings: ErrorExpected[]

  /**
   * The source data.
   *
   * See {@link Validator#source}.
   */
  source: unknown

  /**
   * The result data.
   *
   * See {@link Validator#result}.
   */
  result: unknown

  /**
   * The data storage.
   *
   * See {@link Validator#storage}.
   */
  storage: Record<string, unknown>

}
