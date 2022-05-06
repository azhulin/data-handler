import type { Mode } from "../enum"
import type { Context } from "../interface"
import type { Property } from "../type"

/**
 * The data default value behaviors.
 *
 * The data default value is used by the data handler when the data value is
 * missing for various reasons, and in different situations the different data
 * default value behavior is used to obtain the missing data value.
 */
export interface Default<T = any> {

  /**
   * This data default value behavior can be used as a fallback for other
   * behaviors.
   */
  value: Property<T, Context>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `create` data mode, and the data is configured as
   *   not inputable;
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `create` data mode, the data is configured as not
   *   required, and no data provided.
   */
  [Mode.create]: Property<T, Context>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `update` data mode, and the data is configured as
   *   not inputable;
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating) in `update` data mode, and no data provided.
   */
  [Mode.update]: Property<T, Context>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `input` data format into the `base` data
   *   format (validating), the data is configured as not required, and provided
   *   data is `null`.
   */
  nulled: Property<T, Context>

  /**
   * This data default value behavior is used when:
   * - formatting the data from the `store` data format into the `base` data
   *   format (reading from storage), and the data is configured as not
   *   storable;
   * - formatting the data from the `store` data format into the `base` data
   *   format (reading from storage), and no data provided in the `store` data
   *   format.
   */
  read: Property<T, Context>

}
