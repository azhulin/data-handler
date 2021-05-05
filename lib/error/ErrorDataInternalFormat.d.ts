import type { Format, Path } from "../type";
import { Error } from "@azhulin/data-validator";
/**
 * The data format internal error.
 */
export default class ErrorDataInternalFormat extends Error.Internal {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorDataInternalFormat object.
     */
    constructor(path: Path, id: string, from: Format, to: Format, value: unknown);
}
