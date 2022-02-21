/**
 * Determines whether the value is an object.
 */
export function isObject(value: unknown): boolean {
  return "object" === typeof value && null !== value && Object === value.constructor
}
