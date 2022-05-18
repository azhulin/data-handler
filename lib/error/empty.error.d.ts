import { ErrorExpected } from "../error";
import type { Validator } from "../component";
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
     *
     * @param handler - The data handler instance.
     */
    constructor(handler: Validator);
}
