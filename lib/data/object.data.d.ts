import * as Data from "..";
/**
 * The object data handler class.
 */
declare class $<T> extends Data.Handler<T> {
    /**
     * {@inheritdoc}
     */
    static id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * {@inheritdoc}
     */
    typeName: string;
    /**
     * {@inheritdoc}
     */
    protected preprocessors: Data.Processor.List<any>;
    /**
     * The object data schema.
     */
    protected schema?: Data.Schema;
    /**
     * Whether to generate warnings if data contains keys missing in data schema.
     */
    protected warnExtraKeys: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$Object.Config>, settings?: Data.Settings);
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
    /**
     * Returns the data schema.
     *
     * @returns A data schema.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `schema` data handler property is missing.
     */
    protected getSchema(): Promise<Data.Schema>;
}
/**
 * The object data handler namespace.
 */
export declare namespace $Object {
    type Config<T = any> = Data.Config<T> & {
        schema: Data.Schema;
    };
    const Handler: typeof $;
    const id: string, constraint: Data.Constraint.Library<any>, preparer: Data.Processor.Library<unknown>, processor: Data.Processor.Library<any>;
    function conf<T extends Record<string, unknown>>(config: Config<T>): Data.Definition<any>;
    function init<T extends Record<string, unknown>>(config: Config<T>): Data.Handler<T, T, T>;
}
export {};
