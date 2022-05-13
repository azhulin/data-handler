import { ErrorExpected } from "../error"

import type { Validator } from "../component"

/**
 * The data type error.
 */
export class ErrorType extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.type`

  /**
   * Constructor for the ErrorType object.
   *
   * @param handler - The data handler instance.
   */
  public constructor(handler: Validator) {
    super(`Value has invalid type. ${ErrorType.type(handler)} expected.`, handler.path)
    this.details = { ...this.details, id: handler.id, type: handler.type }
  }

}
