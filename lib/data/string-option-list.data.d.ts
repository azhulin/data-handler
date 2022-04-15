import * as Data from "..";
import { $List, $StringOption } from ".";
/**
 * The string option list data handler class.
 */
declare class StringOptionListHandler extends $List.Handler {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<string[]>;
    /**
     * {@inheritdoc}
     */
    static processor: {
        order: Data.Processor<string[]>;
    };
    /**
     * The options.
     */
    protected options: $StringOption.Options;
    /**
     * Whether to keep the items order from the input.
     */
    protected preserve: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(config: $StringOptionList.Config, settings?: Data.Settings);
}
export declare namespace $StringOptionList {
    type Config<T = string[]> = Omit<$List.Config<T>, "item"> & {
        options: $StringOption.Options;
        preserve?: boolean;
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
    const preparer: Data.Preparer.Library;
    const processor: {
        order: Data.Processor<string[]>;
    };
    function conf(config: Config): {
        Handler: typeof StringOptionListHandler;
        config: Config<string[]>;
    };
    function init(config: Config): StringOptionListHandler;
}
export {};
