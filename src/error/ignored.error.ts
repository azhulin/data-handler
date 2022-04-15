import { ErrorExpected } from "../error"

import type { Path } from "../type"

/**
 * The data ignored error.
 */
export class ErrorIgnored extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.ignored"

  /**
   * Constructor for the ErrorIgnored object.
   */
  public constructor(path: Path) {
    super("Value is ignored.", path)
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    return `Value of the field ${this.getField()} is ignored.`
  }

}
