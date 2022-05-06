import { ErrorExpected } from "../error"

import type { Path } from "../type"

/**
 * The data adapted error.
 *
 * This error can be used to generate a warning when the data was adapted during
 * the validation. For example, when the string was trimmed.
 */
export class ErrorAdapted<T = unknown> extends ErrorExpected {

  /**
   * {@inheritdoc}
   */
  public type: string = `${this.type}.adapted`

  /**
   * Constructor for the ErrorAdapted object.
   *
   * @param path - The path of the data in the data tree.
   * @param original - The original data.
   * @param adapted - The adapted data.
   */
  public constructor(path: Path, original: T, adapted: T) {
    super(`Value was adapted from ${JSON.stringify(original)} to ${JSON.stringify(adapted)}.`, path)
    this.details = { ...this.details, original, adapted }
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    let { original, adapted } = this.details
    original = JSON.stringify(original)
    adapted = JSON.stringify(adapted)
    return `Value of the field ${this.field()} was adapted from ${original} to ${adapted}.`
  }

}
