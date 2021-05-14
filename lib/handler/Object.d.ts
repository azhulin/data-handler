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
    protected get schema(): Data.Schema;
    protected set schema(schema: Data.Schema);
    protected _schema: {
        raw?: Data.Schema;
        prepared?: Data.Schema;
    };
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
    Handler: typeof Handler;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    schema: Record<string, import("@azhulin/data-validator").Definition>;
    reduce?: boolean;
};
export declare function init(config: Config): Handler;
export {};
