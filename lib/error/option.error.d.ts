import { ErrorExpected } from ".";
import type { Handler } from "../component";
import type { Path } from "../type";
import type { $Option } from "../data";
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
    constructor(path: Path, { id, name, description }: Handler, options: $Option.Options);
    /**
     * Returns formatted options.
     */
    protected formatOptions(options: $Option.Options): $Option.Keys | [number, string][] | Record<string, string>;
}
