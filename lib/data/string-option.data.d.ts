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
    constructor(config: $StringOption.Config, settings?: Data.Settings);
    /**
     * Returns option keys.
     */
    protected optionKeys(): string[];
    /**
     * Returns option keys.
     */
    static optionKeys(options: $StringOption.Options): string[];
}
export declare namespace $StringOption {
    type Config = $String.Config & {
        options?: Options;
    };
    type Options = string[] | Record<string, string>;
    const Handler: typeof StringOptionHandler;
    const constraint: {
        trimmed: Data.Constraint<string>;
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
    };
    const preparer: Data.Preparer.Library;
    const processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    function conf(config?: Config): {
        Handler: typeof StringOptionHandler;
        config: Config;
    };
    function init(config?: Config): StringOptionHandler;
}
export {};
