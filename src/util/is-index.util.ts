/**
 * Determines whether the value is an index.
 */
export function isIndex(value: unknown): boolean {
  return Number.isInteger(value) && 0 <= (value as number)
}
