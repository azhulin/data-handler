import * as Data from "..";
/**
 * The number data handler class.
 */
declare class NumberHandler extends Data.Handler<number> {
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
     * The number of decimal places.
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
        neq: (value: number) => Data.Constraint<number>;
    };
    /**
     * {@inheritdoc}
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `decimals` data handler property is invalid.
     */
    constructor(config: $Number.Config, settings?: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: number, context: Data.Context): Promise<number>;
}
/**
 * The number data handler namespace.
 */
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
        neq: (value: number) => Data.Constraint<number>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf(config?: Config): Data.Definition;
    function init(config?: Config): NumberHandler;
}
export {};
