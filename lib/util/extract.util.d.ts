import type { Path } from "../type";
/**
 * Extracts a value from the provided data by the specified data path.
 *
 * @param data - The data to extract the value from.
 * @param path - The data path to extract the value by.
 * @param fallback - A fallback value to return, if the specified data path
 *   does not exist in the provided data.
 *
 * @returns An extracted value, if the specified data path exists, and a
 *   fallback value otherwise.
 */
export declare function extract(data: unknown, path: Path, fallback?: unknown): unknown;
