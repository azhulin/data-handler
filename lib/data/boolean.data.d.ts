import * as Data from "..";
export declare namespace $Boolean {
    type Config<T extends null | boolean> = Data.Config<T>;
}
/**
 * The boolean data handler class.
 */
export declare class $Boolean<T extends null | boolean> extends Data.Handler<T> {
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
    protected isValid(data: unknown): boolean;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Boolean.Config<boolean>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | boolean = boolean>(config?: $Boolean.Config<T>): $Boolean<T>;
}
