import * as Data from "..";
/**
 * The object data handler class.
 */
declare class ObjectHandler extends Data.Handler {
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
     * Whether to use default value, if all schema keys are optional and equal to Null.
     */
    protected reduce: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * Returns prepared schema.
     */
    protected getSchema(format: Data.Format, context: Data.Context): Promise<Data.Schema>;
    private _schema?;
    /**
     * Prepares the schema.
     */
    protected prepareSchema(format: Data.Format, context: Data.Context): Promise<Data.Schema>;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: Record<string, any>, context: Data.Context): Promise<Record<string, any>>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: Record<string, any>, context: Data.Context): Promise<any>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: Record<string, any>, context: Data.Context): Promise<any>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: Record<string, any>, context: Data.Context): Promise<Record<string, any>>;
    /**
     * Performs format conversion.
     */
    protected convert(format: Exclude<Data.Format, Data.Format.input>, data: Record<string, any>, context: Data.Context): Promise<Record<string, any>>;
}
export declare namespace $Object {
    type Config<T extends Record<string, any> = Record<string, any>> = Data.Config<T> & {
        schema: Data.Schema;
        reduce?: boolean;
    };
    const Handler: typeof ObjectHandler;
    const constraint: Data.Constraint.Library;
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library;
    function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>): {
        Handler: typeof ObjectHandler;
        config: Config<T>;
    };
    function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>): ObjectHandler;
}
export {};
