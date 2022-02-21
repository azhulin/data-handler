import { ErrorData } from ".";
/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. checking a non-existing data constraint.
 */
export declare class ErrorUnexpected extends ErrorData {
    /**
     * {@inheritdoc}
     */
    type: string;
}
