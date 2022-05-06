import { ErrorData } from "../error"

/**
 * The unexpected data error.
 *
 * Error not related to the data validation itself, e.g. invalid data handler configuration.
 */
export class ErrorUnexpected extends ErrorData {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.unexpected`

}
