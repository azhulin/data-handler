import type { Validator } from "../component";
import type { Field, Path } from "../type";
/**
 * The base data error.
 */
export declare abstract class ErrorData extends Error {
    /**
     * The error type.
     */
    type: string;
    /**
     * The path of the data in the data tree the error occured for.
     */
    path: Path;
    /**
     * The error details.
     */
    details: Record<string, unknown>;
    /**
     * Constructor for the ErrorData object.
     *
     * @param message - The error message.
     * @param path - The path of the data in the data tree.
     */
    constructor(message: string, path?: Path);
    /**
     * Returns the data field from a data path.
     *
     * @param path - The data path to convert to a data field.
     *
     * @returns The data field.
     */
    protected field(path?: Path): Field;
    /**
     * Returns the formatted handler data type.
     *
     * @param handler - The data handler instance.
     *
     * @returns Formatted data type.
     */
    static type(handler: Validator): string;
}
