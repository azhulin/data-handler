import { ErrorData } from "../error"

/**
 * The unexpected data error.
 *
 * Error not related to the data validation itself. For example, invalid data
 * handler configuration.
 */
export class ErrorUnexpected extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.unexpected`

}
