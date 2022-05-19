import * as Data from "..";
import { $Number } from ".";
/**
 * The number option data handler class.
 */
declare class $ extends $Number.Handler {
    /**
     * {@inheritdoc}
     */
    static id: string;
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
    constructor(config: Partial<$NumberOption.Config>, settings?: Data.Settings);
    /**
     * Returns the option keys.
     *
     * @returns An array of numbers representing the option keys.
     */
    protected optionKeys(): number[];
    /**
     * Returns the option keys of the specified options.
     *
     * @param options - The options.
     *
     * @returns An array of numbers representing the keys of the specified
     *   options.
     */
    static optionKeys(options: $NumberOption.Options): number[];
}
/**
 * The number option data handler namespace.
 */
export declare namespace $NumberOption {
    type Config = Omit<$Number.Config, "decimals"> & {
        options: Options;
    };
    type Options = number[] | Map<number, string>;
    const Handler: typeof $;
    const id: string, constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    }, preparer: Data.Processor.Library<unknown>, processor: Data.Processor.Library<any>;
    function conf(config: Config): Data.Definition<any>;
    function init(config: Config): Data.Handler<number, number, number>;
}
export {};
