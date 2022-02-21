import { ErrorExpected } from ".";
import type { Path } from "../type";
/**
 * The data ignored error.
 */
export declare class ErrorIgnored extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorIgnored object.
     */
    constructor(path: Path);
    /**
     * {@inheritdoc}
     */
    toString(): string;
}
