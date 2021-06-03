import { Handler as HandlerBase } from "@azhulin/data-validator";
import { Format } from "../enum";
import type { Path, Property } from "../type";
import type { BaseContext, Context, Definition, Settings } from "../interface";
/**
 * The base data handler class.
 */
export declare abstract class Handler extends HandlerBase {
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
    validate(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Initializes the handler with data in input format.
     */
    inInput(data: unknown): this;
    /**
     * Initializes the handler with data in base format.
     */
    inBase(data: unknown): this;
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
    toBase(baseContext?: BaseContext): Promise<unknown>;
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
    protected formatInputToBase(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns store data from base data.
     */
    protected formatBaseToStore(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns output data from base data.
     */
    protected formatBaseToOutput(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns base data from store data.
     */
    protected formatStoreToBase(data: unknown, baseContext?: BaseContext): Promise<unknown>;
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
    protected inputToBase(data: unknown, context: Context): Promise<unknown>;
    protected process: (data: unknown, context: Context) => Promise<unknown>;
    /**
     * Converts data in base format to data in store format.
     */
    protected baseToStore(data: unknown, context: Context): Promise<unknown>;
    /**
     * Converts data in base format to data in output format.
     */
    protected baseToOutput(data: unknown, context: Context): Promise<unknown>;
    /**
     * Converts data in store format to data in base format.
     */
    protected storeToBase(data: unknown, context: Context): Promise<unknown>;
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
