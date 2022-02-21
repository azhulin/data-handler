import type { Path } from "../type"

/**
 * Converts a data path to a string.
 */
export function pathToField(path: Path): string {
  return path.map(
    item => "string" === typeof item ? `.${item}` : `[${item}]`
  ).join("")
}
