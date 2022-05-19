import { pathToField } from "../util"

import type { Validator } from "../component"
import type { Field, Path } from "../type"

/**
 * The base data error.
 */
export abstract class ErrorData extends Error {

  /**
   * The error type.
   */
  public type: string = "data"

  /**
   * The path of the data in the data tree the error occured for.
   */
  public path: Path

  /**
   * The error details.
   */
  public details: Record<string, unknown> = {}

  /**
   * Constructor for the ErrorData object.
   *
   * @param message - The error message.
   * @param path - The path of the data in the data tree.
   */
  public constructor(message: string, path: Path = []) {
    super(message)
    this.path = path
    const field = this.field() || undefined
    this.details = { ...this.details, field }
  }

  /**
   * Returns the data field from a data path.
   *
   * @param path - The data path to convert to a data field.
   *
   * @returns The data field.
   */
  protected field(path?: Path): Field {
    return pathToField(path ?? this.path)
  }

  /**
   * Returns the data handler ID.
   *
   * @param handler - The data handler.
   *
   * @returns A data handler ID.
   */
  protected id(handler: Validator): string {
    return (<typeof Validator>handler.constructor).id
  }

}
