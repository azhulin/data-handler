import { ErrorExpected } from "."

import type { Validator } from "../component"
import type { Path } from "../type"

/**
 * The data required error.
 */
export class ErrorRequired extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.required"

  /**
   * Constructor for the ErrorRequired object.
   */
  public constructor(path: Path, { id, name, description }: Validator) {
    super("", path)
    const type = description ? `${name} (${description})` : name
    this.message = `Value is required. ${type} expected.`
    this.details = { ...this.details, type: id }
  }

}
