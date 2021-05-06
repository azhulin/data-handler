import type { Format, Path } from "../type";
import { Error } from "@azhulin/data-validator";
/**
 * The data formatting unexpected error.
 */
export default class ErrorDataUnexpectedFormatting extends Error.Unexpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataInternalFormat object.
     */
    constructor(path: Path, id: string, from: Format, to: Format, value: unknown);
}
