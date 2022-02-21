import * as Data from "..";
export declare namespace $Option {
    type Config<T extends null | number | string> = Data.Config<T> & {
        key_type?: KeyType;
        options?: Options;
    };
    type KeyType = "number" | "string";
    type Keys<T = number | string> = T[];
    type KeysLabelsNumber = Map<number, string>;
    type KeysLabelsString = Record<string, string>;
    type Options = Keys | KeysLabelsNumber | KeysLabelsString;
}
/**
 * The option data handler class.
 */
export declare class $Option<T extends null | number | string> extends Data.Handler<T> {
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
    protected options: $Option.Options;
    /**
     * The type of option keys.
     */
    protected keyType: $Option.KeyType;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected formatInputToBase(data: unknown, baseContext?: Data.BaseContext): Promise<T>;
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
    protected optionKeys(): T[];
    /**
     * Returns option keys.
     */
    static optionKeys(options: $Option.Options): $Option.Keys;
    /**
     * Configures the data handler.
     */
    static conf(config?: $Option.Config<number | string>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | number | string = number | string>(config?: $Option.Config<T>): $Option<T>;
}
