import { ErrorUnexpected } from "../error"

import type { Handler } from "../component"
import type { Format } from "../enum"

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
   * @param handler - The data handler instance.
   * @param from - The data format the data was converted from.
   * @param to - The data format the data was converted to.
   * @param value - The data value.
   */
  public constructor(handler: Handler, from: Format, to: Format, value: unknown) {
    super("Invalid value type detected while formatting data.", handler.path)
    this.details = { ...this.details, id: this.id(handler), from, to, value }
  }

}
