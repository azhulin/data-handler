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
   * @param validator - The data validator instance.
   */
  public constructor(validator: Validator) {
    super("")
    const { id, name, description, path } = validator
    const type = description ? `${name} (${description})` : name
    this.message = `Value should not be empty. ${type} expected.`
    this.path = path
    this.details = { ...this.details, type: id }
  }

}
