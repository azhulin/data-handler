import * as Data from "..";
/**
 * The timestamp data handler class.
 */
declare class $ extends Data.Handler<number> {
    /**
     * {@inheritdoc}
     */
    static id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * {@inheritdoc}
     */
    typeName: string;
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
    type Config = Data.Config<number>;
    const Handler: typeof $;
    const id: string, constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    }, preparer: Data.Processor.Library<unknown>, processor: Data.Processor.Library<any>;
    function conf(config?: Config): Data.Definition<any>;
    function init(config?: Config): Data.Handler<number, number, number>;
}
export {};
