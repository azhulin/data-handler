import * as Data from "..";
export declare type Config = Data.Config & {
    item?: string | Data.Definition;
};
/**
 * The list data handler class.
 */
export default class List extends Data.Handler {
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
    protected item: string | Data.Definition;
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
     * Common inputToBase/baseToStore/baseToOutput/storeToBase handler.
     */
    protected convert(method: "toBase" | "toStore" | "toOutput", data: unknown[], context: Data.Context): Promise<unknown[]>;
    /**
     * Returns data handler.
     */
    protected getHandler(index?: number, data?: unknown): Data.Handler;
}
export { List as Handler };
