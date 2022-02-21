import type { Path } from "../type"

/**
 * The base data error.
 */
export abstract class ErrorData extends Error {

  /**
   * The error type.
   */
  public type: string = "data"

  /**
   * The path of the data in the data tree.
   */
  public path: Path

  /**
   * The error details.
   */
  public details: Record<string, unknown> = {}

  /**
   * Constructor for the ErrorData object.
   */
  public constructor(message: string, path: Path = []) {
    super(message)
    this.path = path
    const field = this.getField() || undefined
    this.details = { ...this.details, field }
  }

  /**
   * Returns the path of the data in the data tree as a string.
   */
  protected getField(path?: Path): string {
    return (path ?? this.path).map(item =>
      "string" === typeof item ? `.${item}` : `[${item}]`).join("")
  }

}
