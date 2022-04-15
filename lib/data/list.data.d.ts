import * as Data from "..";
/**
 * The list data handler class.
 */
declare class ListHandler extends Data.Handler {
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
            /**
             * The list item definition.
             */
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        unique: Data.Constraint<any[]>;
    };
    /**
     * The list item definition.
     */
    protected item: Data.Definition;
    /**
     * The list item type ID.
     */
    protected itemId: string;
    /**
     * The list item type name.
     */
    protected itemName: string;
    /**
     * {@inheritdoc}
     */
    constructor(config: $List.Config, settings?: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: any[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: any[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: unknown[], context: Data.Context): Promise<any[]>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number, data?: unknown): Data.Handler;
}
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
            /**
             * The list item definition.
             */
            lte: (value: number) => Data.Constraint<any[]>;
            neq: (value: number) => Data.Constraint<any[]>;
        };
        unique: Data.Constraint<any[]>;
    };
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library<any>;
    function conf<T extends any[] = any[]>(config: Config<T>): {
        Handler: typeof ListHandler;
        config: Config<T>;
    };
    function init<T extends any[] = any[]>(config: Config<T>): ListHandler;
}
export {};
