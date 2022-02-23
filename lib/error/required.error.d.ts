import { ErrorExpected } from ".";
import type { Validator } from "../component";
import type { Path } from "../type";
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
     */
    constructor(path: Path, { id, name, description }: Validator);
}
