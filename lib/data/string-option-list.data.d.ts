import * as Data from "..";
import { $List, $StringOption } from ".";
/**
 * The string option list data handler class.
 */
declare class StringOptionListHandler extends $List.Handler<string[]> {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<string[]>;
    /**
     * {@inheritdoc}
     */
    protected postprocessors: Data.Processor.List<string[]>;
    /**
     * The options.
     */
    protected options: $StringOption.Options;
    /**
     * Whether to preserve the original order of option items.
     */
    protected preserve_order: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$StringOptionList.Config>, settings?: Data.Settings);
}
/**
 * The string option list data handler namespace.
 */
export declare namespace $StringOptionList {
    type Config<T = string[]> = Omit<$List.Config<T>, "item"> & {
        options: $StringOption.Options;
        preserve_order?: boolean;
    };
    const Handler: typeof StringOptionListHandler;
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
    function init(config: Config): StringOptionListHandler;
}
export {};
