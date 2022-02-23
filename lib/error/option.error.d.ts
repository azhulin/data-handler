import { ErrorExpected } from ".";
import type { Handler } from "../component";
import type { Path } from "../type";
import type { $NumberOption, $StringOption } from "../data";
/**
 * The data option error.
 */
export declare class ErrorOption extends ErrorExpected {
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * Constructor for the ErrorOption object.
     */
    constructor(path: Path, { id, label }: Handler, options: $NumberOption.Options | $StringOption.Options);
    /**
     * Returns formatted options.
     */
    protected formatOptions(options: $NumberOption.Options | $StringOption.Options): (string | number)[] | [number, string][] | Record<string, string>;
}
