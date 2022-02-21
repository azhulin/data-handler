import * as Data from "..";
export declare namespace $Timestamp {
    type Config<T extends null | number> = Data.Config<T>;
}
/**
 * The timestamp data handler class.
 */
export declare class $Timestamp<T extends null | number> extends Data.Handler<T> {
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
    };
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Timestamp.Config<number>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | number = number>(config?: $Timestamp.Config<T>): $Timestamp<T>;
}
