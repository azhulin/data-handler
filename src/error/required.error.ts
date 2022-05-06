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
   * @param validator - The data validator instance.
   */
  public constructor(validator: Validator) {
    super("")
    const { id, name, description, path } = validator
    const type = description ? `${name} (${description})` : name
    this.message = `Value is required. ${type} expected.`
    this.path = path
    this.details = { ...this.details, type: id }
  }

}
