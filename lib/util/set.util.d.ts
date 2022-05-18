import type { Path } from "../type";
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
export declare function set(data: unknown, [...path]: Path, value: unknown): unknown;
