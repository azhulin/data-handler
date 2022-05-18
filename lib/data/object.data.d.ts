import * as Data from "..";
/**
 * The object data handler class.
 */
declare class ObjectHandler<T> extends Data.Handler<T> {
    /**
     * {@inheritdoc}
     */
    get type(): string;
    /**
     * {@inheritdoc}
     */
    get typeName(): string;
    /**
     * {@inheritdoc}
     */
    protected preprocessors: Data.Processor.List<any>;
    /**
     * The object data schema.
     */
    protected schema: $Object.Schema;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$Object.Config>, settings?: Data.Settings);
    /**
     * Returns the data schema.
     *
     * @returns A promise that resolves with a data schema.
     */
    protected getSchema(): Promise<$Object.Schema>;
    private _schema?;
    /**
     * Returns the prepared data schema.
     *
     * @returns A promise that resolves with a prepared data schema.
     */
    protected prepareSchema(): Promise<$Object.Schema>;
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: any, context: Data.Context): Promise<any>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: any, context: Data.Context): Promise<any>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: any, context: Data.Context): Promise<any>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: any, context: Data.Context): Promise<any>;
    /**
     * Performs the data format conversion.
     *
     * @param format - The data format to convert the data to.
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected convert(format: Data.Format, data: any, context: Data.Context): Promise<any>;
}
/**
 * The object data handler namespace.
 */
export declare namespace $Object {
    type Config<T = any> = Data.Config<T> & {
        schema: Schema;
    };
    type Schema = Record<string, Data.Definition>;
    const Handler: typeof ObjectHandler;
    const constraint: Data.Constraint.Library<any>;
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf<T extends Record<string, unknown>>(config: Config<T>): Data.Definition;
    function init<T extends Record<string, unknown>>(config: Config<T>): ObjectHandler<T>;
}
export {};
