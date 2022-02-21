import * as Data from "..";
import { $Number } from ".";
export declare namespace $Integer {
    type Config<T extends null | number> = Data.Config<T>;
}
/**
 * The integer data handler class.
 */
export declare class $Integer<T extends null | number> extends $Number<T> {
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
    /**
     * Configures the data handler.
     */
    static conf(config?: $Integer.Config<number>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | number = number>(config?: $Integer.Config<T>): $Integer<T>;
}
