import * as Data from "..";
/**
 * The string data handler class.
 */
declare class $ extends Data.Handler<string> {
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
    type Config = Data.Config<string>;
    const Handler: typeof $;
    const id: string, constraint: {
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
        trimmed: Data.Constraint<string>;
    }, preparer: Data.Processor.Library<unknown>, processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    function conf(config?: Config): Data.Definition<any>;
    function init(config?: Config): Data.Handler<string, string, string>;
}
export {};
