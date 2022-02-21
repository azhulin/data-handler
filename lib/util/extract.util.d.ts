import type { Path } from "../type";
/**
 * Extracts a value from data by path.
 */
export declare function extract(data: unknown, path: Path, fallback?: unknown): unknown;
