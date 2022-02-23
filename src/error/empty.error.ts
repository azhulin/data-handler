import { ErrorExpected } from "."

import type { Validator } from "../component"
import type { Path } from "../type"

/**
 * The data empty error.
 */
export class ErrorEmpty extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.empty"

  /**
   * Constructor for the ErrorEmpty object.
   */
  public constructor(path: Path, { id, name, description }: Validator) {
    super("", path)
    const type = description ? `${name} (${description})` : name
    this.message = `Value should not be empty. ${type} expected.`
    this.details = { ...this.details, type: id }
  }

}
