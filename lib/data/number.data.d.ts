import * as Data from "..";
/**
 * The number data handler class.
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
    type Config = Data.Config<number> & {
        decimals?: number;
    };
    const Handler: typeof $;
    const id: string, constraint: {
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
