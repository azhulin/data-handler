import { ErrorUnexpected } from "../error"

import type { Field, Path } from "../type"

/**
 * Converts a data field to a data path.
 *
 * @param field - The data field to convert to a data path.
 *
 * @returns A data path.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if an invalid data field is provided.
 */
export function fieldToPath(field: Field): Path {
  if (!field.match(/^((\.[0-9a-z_]+)|(\[[0-9]+\]))*$/i)) {
    throw new ErrorUnexpected(`Invalid data field: ${field}.`)
  }
  return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
    .map(item => "." === item[0] ? item.substring(1) : +item.substring(1, 1))
}
