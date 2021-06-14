import * as Data from "..";
export declare type Config = Data.Config & {
    key_type?: KeyType;
    options?: Options;
};
export declare type Key = number | string;
export declare type KeyType = "number" | "string";
export declare type Keys<T = Key> = T[];
export declare type KeysLabelsNumber = Map<number, string>;
export declare type KeysLabelsString = Record<string, string>;
export declare type Options = Keys | KeysLabelsNumber | KeysLabelsString;
/**
 * The option data handler class.
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
     * The options.
     */
    protected options: Options;
    /**
     * The type of option keys.
     */
    protected keyType: KeyType;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected formatInputToBase(data: unknown, baseContext?: Data.BaseContext): Promise<Key>;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * Determines whether the option key type is valid.
     */
    protected isValidKeyType(key: unknown): boolean;
    /**
     * Returns option keys.
     */
    protected optionKeys(): Keys;
    /**
     * Returns option keys.
     */
    static optionKeys(options: Options): Keys;
}
export declare function conf(config?: Config): {
    Handler: typeof Data.$Option.Handler;
    store?: Data.Property<boolean, Data.Context> | undefined;
    output?: Data.Property<boolean, Data.Context> | undefined;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    postprocessors?: Data.Processor[] | undefined;
    key_type?: Data.$Option.KeyType | undefined;
    options?: Data.$Option.Options | undefined;
};
export declare function init(config?: Config): Data.$Option.Handler;
