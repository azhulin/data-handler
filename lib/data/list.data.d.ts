import * as Data from "..";
/**
 * The list data handler class.
 */
declare class ListHandler<T> extends Data.Handler<T> {
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
    get type(): string;
    /**
     * {@inheritdoc}
     */
    get typeName(): string;
    /**
     * {@inheritdoc}
     */
    protected default: Data.Default<null | any[]>;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        length: {
            eq: (value: number) => Data.Constraint<any[]>;
            gt: (value: number) => Data.Constraint<any[]>;
            gte: (value: number) => Data.Constraint<any[]>;
            lt: (value: number) => Data.Constraint<any[]>;
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        unique: Data.Constraint<any[]>;
    };
    /**
     * The list item data definition.
     */
    protected item?: Data.Definition;
    /**
     * The list item data handler.
     */
    protected get itemHandler(): Data.Handler;
    private _itemHandler?;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$List.Config>, settings?: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: any[], context: Data.Context): Promise<any[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: any[], context: Data.Context): Promise<any[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: any[], context: Data.Context): Promise<any[]>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: any[], context: Data.Context): Promise<any[]>;
    /**
     * Performs the data format conversion.
     *
     * @param format - The data format to convert the data to.
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected convert(format: Data.Format, data: any[], context: Data.Context): Promise<any[]>;
    /**
     * Returns the list item data handler instance for the specified list index.
     *
     * @param index - The list index to return the list item data handler instance
     *   for.
     * @param data - The list item data.
     *
     * @returns A list item data handler instance for the specified list index.
     */
    protected getHandler(index?: number, data?: unknown): Data.Handler;
    /**
     * Returns the list item data definition.
     *
     * @returns List item data definition.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `item` data handler property is missing.
     */
    protected getItem(): Data.Definition<any>;
}
/**
 * The list data handler namespace.
 */
export declare namespace $List {
    type Config<T = any> = Data.Config<T> & {
        item: Data.Definition;
    };
    const Handler: typeof ListHandler;
    const constraint: {
        length: {
            eq: (value: number) => Data.Constraint<any[]>;
            gt: (value: number) => Data.Constraint<any[]>;
            gte: (value: number) => Data.Constraint<any[]>;
            lt: (value: number) => Data.Constraint<any[]>;
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        unique: Data.Constraint<any[]>;
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf<T extends unknown[]>(config: Config<T>): Data.Definition;
    function init<T extends unknown[]>(config: Config<T>): ListHandler<T>;
}
export {};
