import type { Mode } from "../enum"
import type { Property } from "../type"

/**
 * The data default value behaviors.
 *
 * The data default value behaviors are used by the data handler when the data
 * value is missing for various reasons, and in different situations the
 * different data default value behavior is used to obtain the missing data
 * value.
 */
export interface Default<T = any> {

  /**
   * This data default value behavior is used as a fallback for other behaviors.
   */
  value: Property<T>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `create` data mode, and the data is configured as
   *   not inputable;
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `create` data mode, the data is configured as not
   *   required, and data value is not provided (`undefined`).
   */
  [Mode.create]: Property<T>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `update` data mode, and the data is configured as
   *   not inputable;
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `update` data mode, and data value is not
   *   provided (`undefined`).
   */
  [Mode.update]: Property<T>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating), the data is configured as not required, and provided
   *   data value is `null`.
   */
  nulled: Property<T>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `store` data format into the `base` data
   *   format (reading from storage), and the data is configured as not
   *   storable;
   * - formatting the data from the `store` data format into the `base` data
   *   format (reading from storage), and no data provided (`undefined`) in the
   *   `store` data format.
   */
  read: Property<T>

}
