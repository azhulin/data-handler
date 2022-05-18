import { ErrorExpected } from "../error";
import type { Validator } from "../component";
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
     *
     * @param handler - The data handler instance.
     * @param constraint - The data constraint ID.
     * @param message - The error message.
     * @param details - The error details.
     */
    constructor(handler: Validator, constraint: string, message: string, details?: Record<string, unknown>);
}
