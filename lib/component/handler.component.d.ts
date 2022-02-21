import { Validator } from ".";
import { Format } from "../enum";
import type { Definition, Path, Property } from "../type";
import type { BaseContext, Context, Settings } from "../interface";
/**
 * The data handler class.
 */
export declare abstract class Handler<T extends any = any> extends Validator<T> {
    /**
     * The current data format.
     */
    protected format: Format;
    /**
     * The data in current format.
     */
    protected data: unknown;
    /**
     * Whether the data should be present in "store" format.
     */
    protected store: Property<boolean, Context>;
    /**
     * Whether the data should be present in "output" format.
     */
    protected output: Property<boolean, Context>;
    /**
     * Constructor for the Handler object.
     */
    constructor(settings: Settings);
    /**
     * {@inheritdoc}
     */
    validate(data: unknown, baseContext?: BaseContext): Promise<T>;
    /**
     * Initializes the handler with data in input format.
     */
    inInput(data: unknown): this;
    /**
     * Initializes the handler with data in base format.
     */
    inBase(data: T): this;
    /**
     * Initializes the handler with data in store format.
     */
    inStore(data: unknown): this;
    /**
     * Initializes the handler with data in specified format.
     */
    initData(format: Format, data: unknown): this;
    /**
     * Returns the data in base format.
     */
    toBase(baseContext?: BaseContext): Promise<T>;
    /**
     * Returns the data in store format.
     */
    toStore(baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns the data in output format.
     */
    toOutput(baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns data in specified format.
     */
    formatData(format: Format, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns the current data format.
     */
    getFormat(): Format;
    /**
     * Returns the data in current format.
     */
    getData(): unknown;
    /**
     * Returns the data in base format from data in input format.
     */
    protected formatInputToBase(data: unknown, baseContext?: BaseContext): Promise<T>;
    /**
     * Returns store data from base data.
     */
    protected formatBaseToStore(data: T, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns output data from base data.
     */
    protected formatBaseToOutput(data: T, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns base data from store data.
     */
    protected formatStoreToBase(data: unknown, baseContext?: BaseContext): Promise<T>;
    /**
     * Determines whether the data is in expected input format.
     */
    protected isValidInputData(data: unknown): boolean;
    /**
     * Determines whether the data is in expected base format.
     */
    protected isValidBaseData(data: unknown): boolean;
    /**
     * Determines whether the data is in expected store format.
     */
    protected isValidStoreData(data: unknown): boolean;
    /**
     * Converts data in input format to data in base format.
     */
    protected inputToBase(data: NonNullable<T>, context: Context): Promise<NonNullable<T>>;
    protected process: (data: NonNullable<T>, context: Context) => Promise<NonNullable<T>>;
    /**
     * Converts data in base format to data in store format.
     */
    protected baseToStore(data: NonNullable<T>, context: Context): Promise<unknown>;
    /**
     * Converts data in base format to data in output format.
     */
    protected baseToOutput(data: NonNullable<T>, context: Context): Promise<unknown>;
    /**
     * Converts data in store format to data in base format.
     */
    protected storeToBase(data: unknown, context: Context): Promise<NonNullable<T>>;
    /**
     * Returns "store" flag value.
     */
    protected isStorable(context: Context): Promise<boolean>;
    /**
     * Returns "output" flag value.
     */
    protected isOutputable(context: Context): Promise<boolean>;
    /**
     * {@inheritdoc}
     */
    protected initHandler(definition: Definition, path: Path): Handler;
}
