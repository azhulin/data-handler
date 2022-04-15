import * as Data from "..";
import { $List, $NumberOption } from ".";
/**
 * The number option list data handler class.
 */
declare class NumberOptionListHandler extends $List.Handler {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<number[]>;
    /**
     * {@inheritdoc}
     */
    static processor: {
        order: Data.Processor<number[]>;
    };
    /**
     * The options.
     */
    protected options: $NumberOption.Options;
    /**
     * Whether to keep the items order from the input.
     */
    protected preserve: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(config: $NumberOptionList.Config, settings?: Data.Settings);
}
export declare namespace $NumberOptionList {
    type Config<T = number[]> = Omit<$List.Config<T>, "item"> & {
        options: $NumberOption.Options;
        preserve?: boolean;
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
    const preparer: Data.Preparer.Library;
    const processor: {
        order: Data.Processor<number[]>;
    };
    function conf(config: Config): {
        Handler: typeof NumberOptionListHandler;
        config: Config<number[]>;
    };
    function init(config: Config): NumberOptionListHandler;
}
export {};
