import * as Data from "..";
import { $String } from ".";
/**
 * The string option data handler class.
 */
declare class StringOptionHandler extends $String.Handler {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<string>;
    /**
     * The options.
     */
    protected options: $StringOption.Options;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$StringOption.Config>, settings?: Data.Settings);
    /**
     * Returns the option keys.
     *
     * @returns An array of strings representing the option keys.
     */
    protected optionKeys(): string[];
    /**
     * Returns the option keys of the specified options.
     *
     * @param options - The options.
     *
     * @returns An array of strings representing the keys of the specified
     *   options.
     */
    static optionKeys(options: $StringOption.Options): string[];
}
/**
 * The string option data handler namespace.
 */
export declare namespace $StringOption {
    type Config = $String.Config & {
        options: Options;
    };
    type Options = string[] | Record<string, string>;
    const Handler: typeof StringOptionHandler;
    const constraint: {
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
        trimmed: Data.Constraint<string>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    function conf(config: Config): Data.Definition;
    function init(config: Config): StringOptionHandler;
}
export {};
