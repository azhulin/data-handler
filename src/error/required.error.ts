import { ErrorExpected } from "."

import type { Path } from "../type"

/**
 * The data required error.
 */
export class ErrorRequired extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.required"

  /**
   * Constructor for the ErrorRequired object.
   */
  public constructor(path: Path) {
    super("Value is required.", path)
  }

}
