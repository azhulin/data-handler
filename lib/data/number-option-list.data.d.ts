import * as Data from "..";
import { $List, $NumberOption } from ".";
/**
 * The number option list data handler class.
 */
declare class NumberOptionListHandler extends $List.Handler<number[]> {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<number[]>;
    /**
     * {@inheritdoc}
     */
    protected postprocessors: Data.Processor.List<number[]>;
    /**
     * The options.
     */
    protected options: $NumberOption.Options;
    /**
     * Whether to preserve the original order of option items.
     */
    protected preserve_order: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$NumberOptionList.Config>, settings?: Data.Settings);
}
/**
 * The number option list data handler namespace.
 */
export declare namespace $NumberOptionList {
    type Config<T = number[]> = Omit<$List.Config<T>, "item"> & {
        options: $NumberOption.Options;
        preserve_order?: boolean;
    };
    const Handler: typeof NumberOptionListHandler;
    const constraint: {
        length: {
            eq: (value: number) => Data.Constraint<any[]>;
            gt: (value: number) => Data.Constraint<any[]>;
            gte: (value: number) => Data.Constraint<any[]>;
            lt: (value: number) => Data.Constraint<any[]>;
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        unique: Data.Constraint<any[]>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf(config: Config): Data.Definition;
    function init(config: Config): NumberOptionListHandler;
}
export {};
