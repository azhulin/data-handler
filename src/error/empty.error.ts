import { ErrorExpected } from "."

import type { Path } from "../type"

/**
 * The data empty error.
 */
export class ErrorEmpty extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.empty"

  /**
   * Constructor for the ErrorEmpty object.
   */
  public constructor(path: Path) {
    super("Value should not be empty.", path)
  }

}
