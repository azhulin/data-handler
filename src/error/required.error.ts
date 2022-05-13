import { ErrorExpected } from "../error"

import type { Validator } from "../component"

/**
 * The data required error.
 */
export class ErrorRequired extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.required`

  /**
   * Constructor for the ErrorRequired object.
   *
   * @param handler - The data handler instance.
   */
  public constructor(handler: Validator) {
    super(`Value is required. ${ErrorRequired.type(handler)} expected.`, handler.path)
    this.details = { ...this.details, id: handler.id, type: handler.type }
  }

}
