import * as Data from "..";
export declare type Config = Data.Config & {
    decimals?: number;
};
/**
 * The number data handler class.
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
     * The number of decimal points.
     */
    protected decimals: number | null;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: number, context: Data.Context): Promise<number>;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: number, context: Data.Context): Promise<Data.Constraint.Result>;
}
export declare function conf(config?: Config): {
    Handler: typeof Data.$Number.Handler;
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    decimals?: number;
};
export declare function init(config?: Config): Data.$Number.Handler;