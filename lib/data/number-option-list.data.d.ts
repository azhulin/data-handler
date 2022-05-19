import * as Data from "..";
import { $List, $NumberOption } from ".";
/**
 * The number option list data handler class.
 */
declare class $ extends $List.Handler<number[]> {
    /**
     * {@inheritdoc}
     */
    static id: string;
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
    /**
     * {@inheritdoc}
     */
    protected getItem(): Data.Definition;
}
/**
 * The number option list data handler namespace.
 */
export declare namespace $NumberOptionList {
    type Config = Omit<$List.Config<number[]>, "item"> & {
        options: $NumberOption.Options;
        preserve_order?: boolean;
    };
    type Options = $NumberOption.Options;
    const Handler: typeof $;
    const id: string, constraint: {
        length: {
            eq: (value: number) => Data.Constraint<any[]>;
            gt: (value: number) => Data.Constraint<any[]>;
            gte: (value: number) => Data.Constraint<any[]>;
            lt: (value: number) => Data.Constraint<any[]>;
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        items_unique: Data.Constraint<any[]>;
    }, preparer: Data.Processor.Library<unknown>, processor: Data.Processor.Library<any>;
    function conf(config: Config): Data.Definition<any>;
    function init(config: Config): Data.Handler<number[], number[], number[]>;
}
export {};
