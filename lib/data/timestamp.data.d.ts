import * as Data from "..";
/**
 * The timestamp data handler class.
 */
declare class TimestampHandler extends Data.Handler<number> {
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
    get typeDesc(): string;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
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
 * The timestamp data handler namespace.
 */
export declare namespace $Timestamp {
    type Config<T = number> = Data.Config<T>;
    const Handler: typeof TimestampHandler;
    const constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
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
    function init(config?: Config): TimestampHandler;
}
export {};
