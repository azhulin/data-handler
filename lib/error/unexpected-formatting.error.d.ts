import { ErrorUnexpected } from "../error";
import type { Handler } from "../component";
import type { Format } from "../enum";
/**
 * The data formatting unexpected error.
 *
 * This error is used when the data in a safe data format fails validation
 * before converting to another data format. Safe formats are `base` and `store`
 * as the data in these formats is assumed to be valid.
 */
export declare class ErrorUnexpectedFormatting extends ErrorUnexpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorUnexpectedFormatting object.
     *
     * @param handler - The data handler instance.
     * @param from - The data format the data was converted from.
     * @param to - The data format the data was converted to.
     * @param value - The data value.
     */
    constructor(handler: Handler, from: Format, to: Format, value: unknown);
}
