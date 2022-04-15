import * as Data from "..";
/**
 * The string data handler class.
 */
declare class StringHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get name(): string;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        trimmed: Data.Constraint<string>;
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            /**
             * {@inheritdoc}
             */
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
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
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: string, context: Data.Context): Promise<string>;
}
export declare namespace $String {
    type Config<T = string> = Data.Config<T>;
    const Handler: typeof StringHandler;
    const constraint: {
        trimmed: Data.Constraint<string>;
        length: {
            eq: (value: number) => Data.Constraint<string>;
            gt: (value: number) => Data.Constraint<string>;
            /**
             * {@inheritdoc}
             */
            gte: (value: number) => Data.Constraint<string>;
            lt: (value: number) => Data.Constraint<string>;
            lte: (value: number) => Data.Constraint<string>;
            neq: (value: number) => Data.Constraint<string>;
        };
    };
    const preparer: Data.Preparer.Library;
    const processor: {
        trim: (data: string) => string;
        lower: (data: string) => string;
        upper: (data: string) => string;
    };
    function conf(config?: Config): {
        Handler: typeof StringHandler;
        config: Config<string>;
    };
    function init(config?: Config): StringHandler;
}
export {};
