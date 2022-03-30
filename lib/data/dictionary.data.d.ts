import * as Data from "..";
import { $Object } from ".";
/**
 * The dictionary data handler class.
 */
declare class DictionaryHandler extends $Object.Handler {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get label(): string;
    /**
     * {@inheritdoc}
     */
    static constraint: {
        keys_number: {
            eq: (value: number) => Data.Constraint<Record<string, any>>;
            gt: (value: number) => Data.Constraint<Record<string, any>>;
            gte: (value: number) => Data.Constraint<Record<string, any>>;
            lt: (value: number) => Data.Constraint<Record<string, any>>;
            lte: (value: number) => Data.Constraint<Record<string, any>>;
            neq: (value: number) => Data.Constraint<Record<string, any>>;
        };
    };
    /**
     * The dictionary key data definition.
     */
    protected key: Data.Definition;
    /**
     * The dictionary value data definition.
     */
    protected value: Data.Definition;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected prepareSchema(format: Data.Format): Promise<Data.Schema>;
}
export declare namespace $Dictionary {
    type Config<T = Record<string, any>> = Omit<$Object.Config<T>, "schema" | "reduce"> & {
        key: Data.Definition;
        value: Data.Definition;
    };
    const Handler: typeof DictionaryHandler;
    const constraint: {
        keys_number: {
            eq: (value: number) => Data.Constraint<Record<string, any>>;
            gt: (value: number) => Data.Constraint<Record<string, any>>;
            gte: (value: number) => Data.Constraint<Record<string, any>>;
            lt: (value: number) => Data.Constraint<Record<string, any>>;
            lte: (value: number) => Data.Constraint<Record<string, any>>;
            neq: (value: number) => Data.Constraint<Record<string, any>>;
        };
    };
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library;
    function conf<T extends Record<string, any> = Record<string, any>>(config: Config<T>): {
        Handler: typeof DictionaryHandler;
        config: Config<T>;
    };
    function init<T extends Record<string, any> = Record<string, any>>(config: Config<T>): DictionaryHandler;
}
export {};
