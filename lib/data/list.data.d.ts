import * as Data from "..";
export declare type Config = Data.Config & {
    item: Data.Definition;
};
/**
 * The list data handler class.
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
     * {@inheritdoc}
     */
    protected default: Data.Default;
    /**
     * {@inheritdoc}
     */
    protected constraintLibrary: Data.Constraint.Library;
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
    protected checkConstraint(constraint: string, data: unknown[], context: Data.Context): Promise<Data.Constraint.Result>;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToStore(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected baseToOutput(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * {@inheritdoc}
     */
    protected storeToBase(data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Performs format conversion.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number, data?: unknown): Data.Handler;
}
export declare function conf(config: Config): {
    Handler: typeof Data.$List.Handler;
    /**
     * {@inheritdoc}
     */
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    /**
     * {@inheritdoc}
     */
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    item: Data.Definition;
};
export declare function init(config: Config): Data.$List.Handler;
