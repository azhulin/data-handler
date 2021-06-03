import { ErrorUnexpected } from "."

import type { Path } from "../type"
import type { Format } from "../enum"

/**
 * The data formatting unexpected error.
 */
export class ErrorUnexpectedFormatting extends ErrorUnexpected {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.unexpected.formatting"

  /**
   * Constructor for the ErrorUnexpectedFormatting object.
   */
  public constructor(path: Path, id: string, from: Format, to: Format, value: unknown) {
    super(`Invalid value type detected while formatting data.`, path)
    this.details = { ...this.details, id, from, to, value }
  }

}
