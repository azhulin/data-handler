import * as Data from "..";
import { $Number } from ".";
/**
 * The timestamp data handler class.
 */
declare class TimestampHandler extends $Number.Handler {
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
    static constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
        eq: (value: number) => Data.Constraint<number>; /**
         * {@inheritdoc}
         */
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    /**
     * {@inheritdoc}
     */
    protected decimals: null | number;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare namespace $Timestamp {
    type Config = Omit<$Number.Config, "decimals">;
    const Handler: typeof TimestampHandler;
    const constraint: {
        future: Data.Constraint<number>;
        past: Data.Constraint<number>;
        eq: (value: number) => Data.Constraint<number>; /**
         * {@inheritdoc}
         */
        gt: (value: number) => Data.Constraint<number>;
        gte: (value: number) => Data.Constraint<number>;
        lt: (value: number) => Data.Constraint<number>;
        lte: (value: number) => Data.Constraint<number>;
        neq: (value: number) => Data.Constraint<number>;
    };
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library<any>;
    function conf(config?: Config): {
        Handler: typeof TimestampHandler;
        config: Config;
    };
    function init(config?: Config): TimestampHandler;
}
export {};
