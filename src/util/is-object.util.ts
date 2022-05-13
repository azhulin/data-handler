/**
 * Determines whether the provided value is a simple object.
 *
 * @param value - The value to check.
 *
 * @returns `true`, if the provided value is a simple object, and `false`
 *   otherwise.
 */
export function isObject(value: unknown): boolean {
  return "object" === typeof value && null !== value && Object === value.constructor
}
