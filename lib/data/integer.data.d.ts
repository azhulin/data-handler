import * as Data from "..";
import { $Number } from ".";
export declare type Config = Data.Config;
/**
 * The integer data handler class.
 */
export declare class Handler extends $Number.Handler {
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
    protected decimals: number | null;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare function conf(config?: Config): {
    Handler: typeof Data.$Integer.Handler;
    store?: Data.Property<boolean, Data.Context> | undefined;
    output?: Data.Property<boolean, Data.Context> | undefined;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    postprocessors?: Data.Processor[] | undefined;
};
export declare function init(config?: Config): Data.$Integer.Handler;
