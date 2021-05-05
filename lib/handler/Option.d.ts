import * as Data from "..";
export declare type Config = Data.Config & {
    key_type?: KeyType;
    options?: Options;
};
export declare type Key = number | string;
export declare type KeyType = "number" | "string";
export declare type Keys<T = Key> = T[];
export declare type KeysLabels<T = Key> = Map<T, string>;
export declare type Options = Keys | KeysLabels;
/**
 * The option data handler class.
 */
export default class Option extends Data.Handler {
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
    formatInputToBase(data: unknown, baseContext: Data.BaseContext): Promise<Key>;
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
export { Option as Handler };
