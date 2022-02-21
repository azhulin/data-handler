import { ErrorExpected } from "."

import type { Path } from "../type"

/**
 * The data constraint error.
 */
export class ErrorConstraint extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.constraint"

  /**
   * Constructor for the ErrorConstraint object.
   */
  public constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>) {
    super(message, path)
    this.details = { ...this.details, type, constraint, ...details }
  }

}
