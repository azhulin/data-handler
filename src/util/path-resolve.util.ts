import { ErrorUnexpected } from "../error"
import { fieldToPath } from "../util"

import type { FieldRelative, Path } from "../type"

/**
 * Returns the resolved data path after applying the specified relative data
 * field.
 *
 * @param path - The data path to resolve.
 * @param field - The relative data field to apply to the data path.
 *
 * @returns A resolved data path.
 */
export function pathResolve(path: Path, field: FieldRelative = ""): Path {
  const [prefix, level] = field.match(/^\^([0-9]+)?/) ?? ["", "0"]
  const levelsUp = +(level ?? 1)
  if (levelsUp > path.length) {
    throw new ErrorUnexpected("Unable to resolve the data path.")
  }
  return [
    ...path.slice(0, levelsUp ? -levelsUp : undefined),
    ...fieldToPath(field.replace(prefix, "")),
  ]
}
