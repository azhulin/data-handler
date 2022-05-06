import { ErrorUnexpected } from "../error"

import type { Format } from "../enum"
import type { Path } from "../type"

/**
 * The data formatting unexpected error.
 *
 * This error is used when the data in a safe data format fails validation
 * before converting to another data format. Safe formats are `base` and `store`
 * as the data in these formats is assumed to be valid.
 */
export class ErrorUnexpectedFormatting extends ErrorUnexpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.formatting`

  /**
   * Constructor for the ErrorUnexpectedFormatting object.
   *
   * @param path - The path of the data in the data tree.
   * @param id - The data type (data handler ID) of the data error occured for.
   * @param from - The data format the data was converted from.
   * @param to - The data format the data was converted to.
   * @param value - The data value.
   */
  public constructor(path: Path, id: string, from: Format, to: Format, value: unknown) {
    super(`Invalid value type detected while formatting data.`, path)
    this.details = { ...this.details, id, from, to, value }
  }

}
