import { ErrorUnexpected } from "../error"
import { isValidKey } from "../util"

import type { Path } from "../type"

/**
 * Sets the specified value under the specified data path in the provided data.
 *
 * @param data - The data to set value for.
 * @param path - The data path to set the value under.
 * @param value - The value to set.
 *
 * @returns Provided data with the specified value set.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if the specified data path does not exist in provided data.
 */
export function set(data: unknown, [...path]: Path, value: unknown): unknown {
  if (!path.length) {
    return value
  }
  const lastKey = path.pop()!
  let subData: any = data
  const error = () => {
    throw new ErrorUnexpected("Can not set the value, because the specified data path does not exist in provided data.")
  }
  for (const key of path) {
    isValidKey(key, subData, true) || error()
    subData = subData[key]
  }
  isValidKey(lastKey, subData, false) || error()
  undefined === value ? delete subData[lastKey] : subData[lastKey] = value
  return data
}
