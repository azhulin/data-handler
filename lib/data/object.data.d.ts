import * as Data from "..";
export declare type Config = Data.Config & {
    schema: Data.Schema;
    reduce?: boolean;
};
declare type Struct = Record<string, unknown>;
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
    private _preparedSchema;
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
    protected inputToBase(data: Struct, context: Data.Context): Promise<Struct | null>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: Struct, context: Data.Context): Promise<Struct>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: Struct, context: Data.Context): Promise<Struct>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: Struct, context: Data.Context): Promise<Struct>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: Struct, context: Data.Context): Promise<Struct>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string, data: unknown): Data.Handler;
}
export declare function conf(config: Config): {
    Handler: typeof Data.$Object.Handler;
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    schema: Data.Schema;
    reduce?: boolean;
};
export declare function init(config: Config): Data.$Object.Handler;
export {};