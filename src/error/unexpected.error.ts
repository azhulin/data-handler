import { ErrorData } from "."

/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. checking a non-existing data constraint.
 */
export class ErrorUnexpected extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.unexpected"

}
