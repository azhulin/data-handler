import type { Mode } from "../enum"

/**
 * The data options.
 *
 * The options that can be passed to the data handler when formatting the data
 * to change the behavior of the data validation and/or data processing. The
 * data options object is merged into the data context object that can be
 * accessed from the data properties, processors, and constraints.
 */
export interface Options {

  /**
   * The data mode.
   *
   * Default data mode is `create`.
   */
  mode?: Mode

  /**
   * The data.
   *
   * In `create` data mode this option is not required, but still can be used
   * for custom purposes. This option can be accessed from the data context in
   * data properties, processors, and constraints.
   * In `update` data mode this option is required and must contain the original
   * data.
   */
  data?: unknown

  /**
   * Additional custom data options that will be merged into the data context
   * object that can be accessed from the data properties, processors, and
   * constraints.
   */
  [key: string]: unknown

}
