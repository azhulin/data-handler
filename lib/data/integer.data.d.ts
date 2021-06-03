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
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[]; /**
     * {@inheritdoc}
     */
    postprocessors?: Data.Processor[];
};
export declare function init(config?: Config): Data.$Integer.Handler;
