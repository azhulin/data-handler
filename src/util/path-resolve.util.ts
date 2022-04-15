import { ErrorUnexpected } from "../error"
import { fieldToPath } from "../util"

import type { Path } from "../type"

/**
 * Returns the modified path.
 */
export function pathResolve(path: Path, field: string = ""): Path {
  if ("*" === field) {
    return []
  }
  const regexp = /^\^([0-9]+)?/
  const match = field.match(regexp)
  const up = match ? +(match[1] ?? 1) : 0
  field = field.replace(regexp, "")
  if (up > path.length) {
    throw new ErrorUnexpected("Unable to resolve the path, because specified offset is out of bounds.")
  }
  return [
    ...path.slice(0, up ? -up : undefined),
    ...fieldToPath(field),
  ]
}
