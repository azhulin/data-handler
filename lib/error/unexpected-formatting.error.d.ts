import { ErrorUnexpected } from ".";
import type { Format } from "../enum";
import type { Path } from "../type";
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
