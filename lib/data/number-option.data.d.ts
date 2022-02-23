import * as Data from "..";
import { $Number } from ".";
/**
 * The number option data handler class.
 */
declare class NumberOptionHandler extends $Number.Handler {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<number>;
    /**
     * The options.
     */
    protected options: $NumberOption.Options;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * Returns option keys.
     */
    protected optionKeys(): number[];
    /**
     * Returns option keys.
     */
    static optionKeys(options: $NumberOption.Options): number[];
}
export declare namespace $NumberOption {
    type Config = Omit<$Number.Config, "decimals"> & {
        options: Options;
    };
    type Options = number[] | Map<number, string>;
    const Handler: typeof NumberOptionHandler;
    const constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library;
    function conf(config: Config): {
        Handler: typeof NumberOptionHandler;
        config: Config;
    };
    function init(config: Config): NumberOptionHandler;
}
export {};
