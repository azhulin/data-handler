import type { Path } from "../type";
/**
 * The base data error.
 */
export declare abstract class ErrorData extends Error {
    /**
     * The error type.
     */
    type: string;
    /**
     * The path of the data in the data tree.
     */
    path: Path;
    /**
     * The error details.
     */
    details: Record<string, unknown>;
    /**
     * Constructor for the ErrorData object.
     */
    constructor(message: string, path?: Path);
    /**
     * Returns the path of the data in the data tree as a string.
     */
    protected getField(path?: Path): string;
}
