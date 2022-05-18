import type { FieldRelative, Path } from "../type";
/**
 * Returns the resolved data path after applying the specified relative data
 * field.
 *
 * @param path - The data path to resolve.
 * @param field - The relative data field to apply to the data path.
 *
 * @returns A resolved data path.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if the data path can not be resolved.
 */
export declare function pathResolve(path: Path, field?: FieldRelative): Path;
