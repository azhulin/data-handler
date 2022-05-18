import * as Data from "..";
/**
 * The integer data handler class.
 */
declare class IntegerHandler extends Data.Handler<number> {
    /**
     * {@inheritdoc}
     */
    get type(): string;
    /**
     * {@inheritdoc}
     */
    get typeName(): string;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
}
/**
 * The integer data handler namespace.
 */
export declare namespace $Integer {
    type Config<T = number> = Data.Config<T>;
    const Handler: typeof IntegerHandler;
    const constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf(config?: Config): Data.Definition;
    function init(config?: Config): IntegerHandler;
}
export {};
