import * as Data from "..";
export declare type Config = Data.Config;
/**
 * The timestamp data handler class.
 */
export declare class Handler extends Data.Handler {
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
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare function conf(config?: Config): {
    Handler: typeof Data.$Timestamp.Handler;
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    /**
     * {@inheritdoc}
     */
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
};
export declare function init(config?: Config): Data.$Timestamp.Handler;
