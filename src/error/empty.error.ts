import { ErrorExpected } from "../error"

import type { Validator } from "../component"

/**
 * The data empty error.
 */
export class ErrorEmpty extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.empty`

  /**
   * Constructor for the ErrorEmpty object.
   *
   * @param handler - The data handler instance.
   */
  public constructor(handler: Validator) {
    super(`Value must not be empty. ${ErrorEmpty.type(handler)} expected.`, handler.path)
    this.details = { ...this.details, id: handler.id, type: handler.type }
  }

}
