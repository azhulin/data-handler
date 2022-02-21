import * as Data from "..";
export declare namespace $List {
    type Config<T extends null | any[]> = Data.Config<T> & {
        item: Data.Definition;
    };
}
/**
 * The list data handler class.
 */
export declare class $List<T extends null | any[]> extends Data.Handler<T> {
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
    protected default: Data.Default<T>;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        length: {
            eq: (length: number) => Data.Constraint<any[]>;
            gt: (length: number) => Data.Constraint<any[]>;
            gte: (length: number) => Data.Constraint<any[]>;
            lt: (length: number) => Data.Constraint<any[]>;
            lte: (length: number) => Data.Constraint<any[]>;
            neq: (length: number) => Data.Constraint<any[]>;
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
    protected typeId: string;
    /**
     * The list item type name.
     */
    protected typeName: string;
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
    protected inputToBase(data: NonNullable<T>, context: Data.Context): Promise<NonNullable<T>>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: NonNullable<T>, context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: NonNullable<T>, context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: unknown[], context: Data.Context): Promise<NonNullable<T>>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number, data?: unknown): Data.Handler;
    /**
     * Configures the data handler.
     */
    static conf(config?: $List.Config<any[]>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | any[] = any[]>(config?: $List.Config<T>): $List<T>;
}
