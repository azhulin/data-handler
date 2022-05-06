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
   * @param validator - The data validator instance.
   */
  public constructor(validator: Validator) {
    super("")
    const { id, name, description, path } = validator
    const type = description ? `${name} (${description})` : name
    this.message = `Value has invalid type. ${type} expected.`
    this.path = path
    this.details = { ...this.details, type: id }
  }

}
