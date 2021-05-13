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
    name: string;
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
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    decimals?: number;
    Handler: typeof Handler;
};
export declare function init(config?: Config): Handler;
