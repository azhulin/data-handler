import * as Data from "..";
export declare type Config = Data.Config & {
    schema: Data.Schema;
    reduce?: boolean;
};
/**
 * The object data handler class.
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
     * The schema.
     */
    protected schema: Data.Schema;
    /**
     * The prepared schema.
     */
    protected get preparedSchema(): Data.Schema;
    private _preparedSchema?;
    /**
     * Whether to use default value, if all schema keys are optional and equal to Null.
     */
    protected reduce: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * Prepares the schema.
     */
    protected prepareSchema(): Data.Schema;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown> | null>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: Record<string, unknown>, context: Data.Context): Promise<Record<string, unknown>>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string, data: unknown): Data.Handler;
}
export declare function conf(config: Config): {
    Handler: typeof Data.$Object.Handler;
    store?: Data.Property<boolean, Data.Context> | undefined;
    output?: Data.Property<boolean, Data.Context> | undefined;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preparers?: Data.Processor[] | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    postprocessors?: Data.Processor[] | undefined;
    schema: Data.Schema;
    reduce?: boolean | undefined;
};
export declare function init(config: Config): Data.$Object.Handler;
