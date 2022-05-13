import { isIndex, isObject } from "../util"

/**
 * Checks whether the specified key is valid for the provided data.
 *
 * @param key - The key to check.
 * @param data - The data to check the key for.
 * @param exists - Whether to check key existence.
 *
 * @returns `true`, if the specified key is valid for the provided data, and
 *   `false` otherwise.
 */
export function isValidKey(key: number | string, data: unknown, exists: boolean): boolean {
  return (
    "string" === typeof key && isObject(data)
      || isIndex(key) && Array.isArray(data)
  ) && (exists ? key in <object>data : true)
}
