import { $Number } from ".";
/**
 * The integer data handler class.
 */
declare class IntegerHandler extends $Number.Handler {
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
     * {@inheritdoc}
     */
    protected decimals: null | number;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare namespace $Integer {
    type Config = Omit<$Number.Config, "decimals">;
    const Handler: typeof IntegerHandler;
    const constraint: {
        eq: (value: number) => import("..").Constraint<number>;
        gt: (value: number) => import("..").Constraint<number>;
        gte: (value: number) => import("..").Constraint<number>;
        lt: (value: number) => import("..").Constraint<number>;
        lte: (value: number) => import("..").Constraint<number>;
        neq: (value: number) => import("..").Constraint<number>;
    };
    const preparer: import("..").Preparer.Library;
    const processor: import("..").Processor.Library;
    function conf(config?: Config): {
        Handler: typeof IntegerHandler;
        config: Config;
    };
    function init(config?: Config): IntegerHandler;
}
export {};
