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
    Handler: typeof Handler;
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    key_type?: import("@azhulin/data-validator/lib/handler/Option").KeyType;
    options?: Options;
};
export declare function init(config?: Config): Handler;
