import { ErrorExpected } from "../error"

import type { Path } from "../type"

/**
 * The data constraint error.
 */
export class ErrorConstraint extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.constraint`

  /**
   * Constructor for the ErrorConstraint object.
   *
   * @param message - The error message.
   * @param path - The path of the data in the data tree.
   * @param type - The data type (data handler ID) of the data error occured for.
   * @param constraint - The data constraint ID.
   * @param details - The error details.
   */
  public constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>) {
    super(message, path)
    this.details = { ...this.details, type, constraint, ...details }
  }

}
