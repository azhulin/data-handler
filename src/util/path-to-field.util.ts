import type { Field, Path } from "../type"

/**
 * Converts a data path to a data field.
 */
export function pathToField(path: Path): Field {
  return path.map(
    item => "string" === typeof item ? `.${item}` : `[${item}]`
  ).join("")
}
