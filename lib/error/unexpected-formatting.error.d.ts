import { ErrorUnexpected } from ".";
import type { Path } from "../type";
import type { Format } from "../enum";
/**
 * The data formatting unexpected error.
 */
export declare class ErrorUnexpectedFormatting extends ErrorUnexpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorUnexpectedFormatting object.
     */
    constructor(path: Path, id: string, from: Format, to: Format, value: unknown);
}
