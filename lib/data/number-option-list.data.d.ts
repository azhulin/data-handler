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
    constructor(settings: Data.Settings);
}
export declare namespace $NumberOptionList {
    type Config<T extends any[] = number[]> = Omit<$List.Config<T>, "item"> & {
        options: $NumberOption.Options;
        preserve?: boolean;
    };
    const Handler: typeof NumberOptionListHandler;
    const constraint: {
        length: {
            eq: (length: number) => Data.Constraint<any[]>;
            gt: (length: number) => Data.Constraint<any[]>;
            gte: (length: number) => Data.Constraint<any[]>;
            lt: (length: number) => Data.Constraint<any[]>;
            lte: (length: number) => Data.Constraint<any[]>;
            neq: (length: number) => Data.Constraint<any[]>;
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
