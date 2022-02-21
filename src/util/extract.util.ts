import { isIndex, isObject } from "."

import type { Path } from "../type"

/**
 * Extracts a value from data by path.
 */
export function extract(data: unknown, path: Path, fallback: unknown = undefined): unknown {
  let value: any = data
  for (const key of path) {
    if ("string" === typeof key && !isObject(value)
        || isIndex(key) && !Array.isArray(value)
        || !(key in value)) {
      return fallback
    }
    value = value[key]
  }
  return value
}
