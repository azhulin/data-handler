import { ErrorUnexpected } from "../error"

import type { Path } from "../type"

/**
 * Converts a string to a data path.
 */
export function fieldToPath(field?: string): Path {
  if (!field) {
    return []
  }
  if (!field.match(/^((\.[0-9a-z_]+)|(\[[0-9]+\]))+$/i)) {
    throw new ErrorUnexpected(`Unable to convert field to path, because specified field '${field}' is invalid.`)
  }
  return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
    .map(item => "." === item[0] ? item.substring(1) : +item.substring(1, 1))
}
