import { ErrorExpected } from "../error";
import type { Path } from "../type";
/**
 * The data ignored error.
 *
 * This error can be used to generate a warning when the redundant data is
 * provided in the input. For example, when provided an object with a key that
 * is not described in the data schema.
 */
export declare class ErrorIgnored extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorIgnored object.
     *
     * @param path - The path of the data in the data tree.
     */
    constructor(path: Path);
    /**
     * {@inheritdoc}
     */
    toString(): string;
}
