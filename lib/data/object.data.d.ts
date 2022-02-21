import * as Data from "..";
export declare namespace $Object {
    type Config<T extends null | Record<string, any>> = Data.Config<T> & {
        schema: Data.Schema;
        reduce?: boolean;
    };
}
/**
 * The object data handler class.
 */
export declare class $Object<T extends null | Record<string, any>> extends Data.Handler<T> {
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
    protected inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: NonNullable<T>, context: Data.Context): Promise<unknown>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: NonNullable<T>, context: Data.Context): Promise<unknown>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>>;
    /**
     * Returns data handler.
     */
    protected getHandler(key: string, data: unknown): Data.Handler;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Object.Config<Record<string, any>>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | Record<string, any> = Record<string, any>>(config?: $Object.Config<T>): $Object<T>;
}
