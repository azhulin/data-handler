import * as Data from "..";
import { $List, $StringOption } from ".";
/**
 * The string option list data handler class.
 */
declare class $ extends $List.Handler<string[]> {
    /**
     * {@inheritdoc}
     */
    static id: string;
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
    /**
     * {@inheritdoc}
     */
    protected getItem(): Data.Definition;
}
/**
 * The string option list data handler namespace.
 */
export declare namespace $StringOptionList {
    type Config = Omit<$List.Config<string[]>, "item"> & {
        options: $StringOption.Options;
        preserve_order?: boolean;
    };
    type Options = $StringOption.Options;
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
    function init(config: Config): Data.Handler<string[], string[], string[]>;
}
export {};
