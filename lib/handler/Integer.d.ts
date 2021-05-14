import * as Data from "..";
import * as $Number from "./Number";
export declare type Config = Data.Config;
/**
 * The integer data handler class.
 */
export declare class Handler extends $Number.Handler {
    /**
     * {@inheritdoc}
     */
    id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
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
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    store?: Data.Property<boolean, Data.Context>; /**
     * {@inheritdoc}
     */
    output?: Data.Property<boolean, Data.Context>;
    Handler: typeof Handler;
};
export declare function init(config?: Config): Handler;
