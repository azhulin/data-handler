import { ErrorExpected } from "../error"

import type { Path } from "../type"

/**
 * The data ignored error.
 *
 * This error can be used to generate a warning when the redundant data is
 * provided in the input. For example, when provided an object with a key that
 * is not described in the data schema.
 */
export class ErrorIgnored extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.ignored`

  /**
   * Constructor for the ErrorIgnored object.
   *
   * @param path - The path of the data in the data tree.
   */
  public constructor(path: Path) {
    super("Value is ignored.", path)
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    const field = this.field()
    return field ? `Value of the field ${field} is ignored.` : this.message
  }

}
