import { ErrorExpected } from "../error";
import type { Validator } from "../component";
/**
 * The data required error.
 */
export declare class ErrorRequired extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorRequired object.
     *
     * @param handler - The data handler instance.
     */
    constructor(handler: Validator);
}
