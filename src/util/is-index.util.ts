/**
 * Determines whether the provided value is a valid array index.
 *
 * @param value - The value to check.
 *
 * @returns `true`, if the providedd value is a valid array index, and `false`
 *   otherwise.
 */
export function isIndex(value: unknown): boolean {
  return Number.isInteger(value) && 0 <= <number>value
}
