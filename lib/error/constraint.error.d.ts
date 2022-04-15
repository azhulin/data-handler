import { ErrorExpected } from "../error";
import type { Path } from "../type";
/**
 * The data constraint error.
 */
export declare class ErrorConstraint extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorConstraint object.
     */
    constructor(message: string, path: Path, type: string, constraint: string, details?: Record<string, unknown>);
}
