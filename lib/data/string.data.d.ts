import * as Data from "..";
/**
 * The string data handler class.
 */
declare class StringHandler extends Data.Handler<string> {
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
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
        trimmed: Data.Constraint<string>;
    };
    /**
     * {@inheritdoc}
     */
    static processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
}
/**
 * The string data handler namespace.
 */
export declare namespace $String {
    type Config<T = string> = Data.Config<T>;
    const Handler: typeof StringHandler;
    const constraint: {
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
        trimmed: Data.Constraint<string>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    function conf(config?: Config): Data.Definition;
    function init(config?: Config): StringHandler;
}
export {};
