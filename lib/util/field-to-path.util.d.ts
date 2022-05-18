import type { Field, Path } from "../type";
/**
 * Converts a data field to a data path.
 *
 * @param field - The data field to convert to a data path.
 *
 * @returns A data path.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if an invalid data field is provided.
 */
export declare function fieldToPath(field: Field): Path;
