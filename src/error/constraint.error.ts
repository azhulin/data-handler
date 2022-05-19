import { ErrorExpected } from "../error"

import type { Validator } from "../component"

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
   * @param handler - The data handler instance.
   * @param constraint - The data constraint ID.
   * @param message - The error message.
   * @param details - The error details.
   */
  public constructor(handler: Validator, constraint: string, message: string, details?: Record<string, unknown>) {
    super(message, handler.path)
    this.details = {
      ...this.details, type: handler.type, id: this.id(handler), constraint, ...details,
    }
  }

}
