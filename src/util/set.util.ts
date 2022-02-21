import { isIndex, isObject } from "."
import { ErrorUnexpected } from "../error"

import type { Path } from "../type"

/**
 * Sets data value by path.
 */
export function set(data: unknown, path: Path, item: unknown): unknown {
  if (!path.length) {
    return item
  }
  path = [...path]
  const last = path.pop()!
  let value: any = data
  for (const key of path) {
    if ("string" === typeof key && !isObject(value)
        || isIndex(key) && !Array.isArray(value)
        || !(key in (value as object))) {
      throw new ErrorUnexpected("Can not set data, because specified path does not exist.")
    }
    value = value[key]
  }
  if ("string" === typeof last && !isObject(value)
      || isIndex(last) && !Array.isArray(value)) {
    throw new ErrorUnexpected("Can not set data, because value at specified path is invalid.")
  }
  undefined === item ? delete value[last] : value[last] = item
  return data
}
