import * as Data from "..";
export declare namespace $String {
    type Config<T extends null | string> = Data.Config<T>;
}
/**
 * The string data handler class.
 */
export declare class $String<T extends null | string> extends Data.Handler<T> {
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
            eq: (length: number) => Data.Constraint<string>;
            gt: (length: number) => Data.Constraint<string>;
            gte: (length: number) => Data.Constraint<string>;
            lt: (length: number) => Data.Constraint<string>;
            lte: (length: number) => Data.Constraint<string>;
            neq: (length: number) => Data.Constraint<string>;
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
    protected inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>>;
    /**
     * Configures the data handler.
     */
    static conf(config?: $String.Config<string>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | string = string>(config?: $String.Config<T>): $String<T>;
}
