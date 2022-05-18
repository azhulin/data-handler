import * as Data from "..";
import { $Object } from ".";
/**
 * The dictionary data handler class.
 */
declare class DictionaryHandler<T> extends $Object.Handler<T> {
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
    static constraint: {
        items_number: {
            eq: (value: number) => Data.Constraint<Record<string, unknown>>;
            gt: (value: number) => Data.Constraint<Record<string, unknown>>;
            gte: (value: number) => Data.Constraint<Record<string, unknown>>;
            lt: (value: number) => Data.Constraint<Record<string, unknown>>;
            lte: (value: number) => Data.Constraint<Record<string, unknown>>;
            neq: (value: number) => Data.Constraint<Record<string, unknown>>;
        };
    };
    /**
     * The dictionary key data definition.
     */
    protected key?: Data.Definition;
    /**
     * The dictionary value data definition.
     */
    protected value?: Data.Definition;
    /**
     * {@inheritdoc}
     */
    constructor(config: Partial<$Dictionary.Config>, settings?: Data.Settings);
    /**
     * Returns the dictionary key data definition.
     *
     * @returns Dictionary key data definition.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `key` data handler property is missing.
     */
    protected getKey(): Data.Definition;
    /**
   * Returns the dictionary value data definition.
   *
   * @returns Dictionary value data definition.
   *
   * @throws {@link Data.ErrorUnexpected}
   * Thrown if the `value` data handler property is missing.
   */
    protected getValue(): Data.Definition;
    /**
     * {@inheritdoc}
     *
     * @throws {@link Data.ErrorConstraint}
     * Thrown if dictionary key failed validation.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if unexpectted error occured during dictionary key validation.
     */
    protected convert(format: Data.Format, data: any, context: Data.Context): Promise<any>;
}
/**
 * The dictionary data handler namespace.
 */
export declare namespace $Dictionary {
    type Config<T = any> = Omit<$Object.Config<T>, "schema"> & {
        key: Data.Definition;
        value: Data.Definition;
    };
    const Handler: typeof DictionaryHandler;
    const constraint: {
        items_number: {
            eq: (value: number) => Data.Constraint<Record<string, unknown>>;
            gt: (value: number) => Data.Constraint<Record<string, unknown>>;
            gte: (value: number) => Data.Constraint<Record<string, unknown>>;
            lt: (value: number) => Data.Constraint<Record<string, unknown>>;
            lte: (value: number) => Data.Constraint<Record<string, unknown>>;
            neq: (value: number) => Data.Constraint<Record<string, unknown>>;
        };
    };
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf<T extends Record<string, unknown>>(config: Config<T>): Data.Definition;
    function init<T extends Record<string, unknown>>(config: Config<T>): DictionaryHandler<T>;
}
export {};
