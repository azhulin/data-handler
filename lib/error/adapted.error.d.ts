import { ErrorExpected } from "../error";
import type { Path } from "../type";
/**
 * The data adapted error.
 */
export declare class ErrorAdapted extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorAdapted object.
     */
    constructor(path: Path, original: unknown, adapted: unknown);
    /**
     * {@inheritdoc}
     */
    toString(): string;
}
