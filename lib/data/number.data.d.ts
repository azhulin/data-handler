import * as Data from "..";
/**
 * The number data handler class.
 */
declare class NumberHandler extends Data.Handler {
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
    get description(): string;
    /**
     * The number of decimal points.
     */
    protected decimals: null | number;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>; /**
         * {@inheritdoc}
         */
    };
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: number, context: Data.Context): Promise<number>;
}
export declare namespace $Number {
    type Config<T = number> = Data.Config<T> & {
        decimals?: number;
    };
    const Handler: typeof NumberHandler;
    const constraint: {
        eq: (value: number) => Data.Constraint<number>;
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>; /**
         * {@inheritdoc}
         */
    };
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library;
    function conf(config?: Config): {
        Handler: typeof NumberHandler;
        config: Config<number>;
    };
    function init(config?: Config): NumberHandler;
}
export {};
