import type { Format, Path } from "../type"
import { Error } from "@azhulin/data-validator"

/**
 * The data format internal error.
 */
export default class ErrorDataInternalFormat extends Error.Internal {

  /**
   * {@inheritdoc}
   */
  public type: string = "data.internal.format"

  /**
   * Constructor for the ErrorDataInternalFormat object.
   */
  public constructor(path: Path, id: string, from: Format, to: Format, value: unknown) {
    super(`Invalid value type detected while formatting data.`, path)
    this.details = { ...this.details, id, from, to, value }
  }

}
