import { ErrorExpected } from "../error";
import type { Validator } from "../component";
/**
 * The data type error.
 */
export declare class ErrorType extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorType object.
     *
     * @param handler - The data handler instance.
     */
    constructor(handler: Validator);
}
