import { ErrorExpected } from ".";
import type { Path } from "../type";
/**
 * The data empty error.
 */
export declare class ErrorEmpty extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorEmpty object.
     */
    constructor(path: Path);
}
