import * as Data from "..";
export declare type Config = Data.Config;
/**
 * The string data handler class.
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
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * {@inheritdoc}
     */
    protected processorLibrary: Data.Processor.Library;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: string, context: Data.Context): Promise<string>;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: string, context: Data.Context): Promise<Data.Constraint.Result>;
}
export declare function conf(config?: Config): {
    Handler: typeof Data.$String.Handler;
    store?: Data.Property<boolean, Data.Context> | undefined;
    output?: Data.Property<boolean, Data.Context> | undefined;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    postprocessors?: Data.Processor[] | undefined;
};
export declare function init(config?: Config): Data.$String.Handler;
