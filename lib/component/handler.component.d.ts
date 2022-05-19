import { Validator } from "../component";
import { Format } from "../enum";
import type { Context, Definition, Options } from "../interface";
import type { HandlerConstructor, Path, Property } from "../type";
/**
 * The data handler class.
 *
 * The base data handler class containing the data formatting functionality.
 * The generics of the data handler class allow to specify the type of the
 * returned data in corresponging data formats:
 * - `B` for `base` data format;
 * - `S` for `store` data format;
 * - `O` for `output` data format.
 */
export declare abstract class Handler<B = unknown, S = B, O = B> extends Validator {
    /**
     * The current data format.
     */
    protected format: Format;
    /**
     * The data in current data format.
     */
    protected data: unknown;
    /**
     * The `store` data property.
     *
     * The `store` data property determines whether the data value is storable.
     * That is, the data value must be passed to, and accepted from the `store`
     * data format.
     * When formatting the data from the `base` data format into the `store` data
     * format (storing), and the computed value of the `store` data property is:
     * - `true`: the data value is passed to the `store` data format;
     * - `false`: the data value is not passed to the `store` data format.
     * When formatting the data from the `store` data format into the `base` data
     * format (reading), and the computed value of the `store` data property is:
     * - `true`: the data value is accepted from the `store` data format;
     * - `false`: the data value is taken from the `read` data default value
     *   behavior (`null` by default).
     * By default, the `store` data property is `true`. It can be overridden in
     * the data handler configuration.
     *
     * @see Config#store
     * @see Default
     */
    protected store: Property<boolean>;
    /**
     * The `output` data property.
     *
     * The `output` data property determines whether the data value is
     * outputable. That is, the data value must be passed to the `output` data
     * format.
     * When formatting the data from the `base` data format into the `output` data
     * format (outputting), and the computed value of the `output` data property
     * is:
     * - `true`: the data value is passed to the `output` data format;
     * - `false`: the data value is not passed to the `output` data format.
     * By default, the `output` data property is `true`. It can be overridden in
     * the data handler configuration.
     *
     * @see Config#output
     * @see Default
     */
    protected output: Property<boolean>;
    /**
     * {@inheritdoc}
     */
    validate(data: unknown, options?: Options): Promise<null | B>;
    /**
     * Initializes the data handler with the provided data in `input` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inInput(data: unknown): this;
    /**
     * Initializes the data handler with the provided data in `base` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inBase(data: unknown): this;
    /**
     * Initializes the data handler with the provided data in `store` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inStore(data: unknown): this;
    /**
     * Initializes the data handler with the provided data in specified data
     * format.
     *
     * @param format - The data format to initalize the data handler in.
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     */
    in(format: Format, data: unknown): this;
    /**
     * Returns the data formatted into the `base` data format.
     *
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted into the `base` data
     *   format.
     *
     * @see Format
     */
    toBase(options?: Options): Promise<null | B>;
    /**
     * Returns the data formatted into the `store` data format.
     *
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted into the `store`
     *   data format.
     *
     * @see Format
     */
    toStore(options?: Options): Promise<undefined | null | S>;
    /**
     * Returns the data formatted into the `output` data format.
     *
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted into the `output`
     *   data format.
     *
     * @see Format
     */
    toOutput(options?: Options): Promise<undefined | null | O>;
    /**
     * Returns the data formatted into the specified data format.
     *
     * @param format - The data format to format the data into.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted into the specified
     *   data format.
     *
     * @throws {@link ErrorUnexpected}
     * Thrown in case of invalid data format transition.
     */
    to(format: Format, options?: Options): Promise<unknown>;
    /**
     * Returns the data formatted from the `input` data format into the `base`
     * data format (data validation).
     *
     * @param data - The data to format.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted from the `input`
     * data format into the `base` data format.
     *
     * @see Validator#validate
     */
    protected formatInputToBase(data: unknown, options?: Options): Promise<unknown>;
    /**
     * Returns the data formatted from the `base` data format into the `store`
     * data format (data storing).
     *
     * The data storing process can be divided into the following steps:
     *   1. Ensuring the data:
     *   - handling the storable data property (see `isStorable` method).
     *   2. Validating the type of the data (see `isValidTypeBase` method).
     *   3. Processing the data (see `baseToStore` method).
     *
     * @param data - The data to format.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted from the `base`
     * data format into the `store` data format.
     *
     * @throws {@link ErrorUnexpectedFormatting}
     * Thrown if the data to format has invalid type.
     *
     * @see Handler#isStorable
     * @see Handler#isValidTypeBase
     * @see Handler#baseToStore
     */
    protected formatBaseToStore(data: unknown, options?: Options): Promise<unknown>;
    /**
     * Returns the data formatted from the `base` data format into the `output`
     * data format (data outputting).
     *
     * The data outputting process can be divided into the following steps:
     *   1. Ensuring the data:
     *   - handling the outputable data property (see `isOutputable` method).
     *   2. Validating the type of the data (see `isValidTypeBase` method).
     *   3. Processing the data (see `baseToOutput` method).
     *
     * @param data - The data to format.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted from the `base`
     * data format into the `output` data format.
     *
     * @throws {@link ErrorUnexpectedFormatting}
     * Thrown if the data to format has invalid type.
     *
     * @see Handler#isOutputable
     * @see Handler#isValidTypeBase
     * @see Handler#baseToOutput
     */
    protected formatBaseToOutput(data: unknown, options?: Options): Promise<unknown>;
    /**
     * Returns the data formatted from the `store` data format into the `base`
     * data format (data reading).
     *
     * The data reading process can be divided into the following steps:
     *   1. Ensuring the data:
     *   - handling the storable data property (see `isStorable` method).
     *   2. Validating the type of the data (see `isValidTypeStore` method).
     *   3. Processing the data (see `storeToBase` method).
     *
     * @param data - The data to format.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a data formatted from the `store`
     * data format into the `base` data format.
     *
     * @throws {@link ErrorUnexpectedFormatting}
     * Thrown if the data to format has invalid type.
     *
     * @see Handler#isStorable
     * @see Handler#isValidTypeStore
     * @see Handler#baseToOutput
     */
    protected formatStoreToBase(data: unknown, options?: Options): Promise<unknown>;
    /**
     * Determines whether the provided data has an expected data type for the
     * `input` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `input` data format, and `false` otherwise.
     */
    protected isValidTypeInput(data: unknown): boolean;
    /**
     * Determines whether the provided data has an expected data type for the
     * `base` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `base` data format, and `false` otherwise.
     */
    protected isValidTypeBase(data: unknown): boolean;
    /**
     * Determines whether the provided data has an expected data type for the
     * `store` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `store` data format, and `false` otherwise.
     */
    protected isValidTypeStore(data: unknown): boolean;
    /**
     * Converts the ensured data of the expected data type from the `input` data
     * format into the `base` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected inputToBase(data: unknown, context: Context): Promise<any>;
    protected handle: (data: unknown, context: Context) => Promise<any>;
    /**
     * Converts the ensured data of the expected data type from the `base` data
     * format into the `store` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected baseToStore(data: unknown, context: Context): Promise<any>;
    /**
     * Converts the ensured data of the expected data type from the `base` data
     * format into the `output` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected baseToOutput(data: unknown, context: Context): Promise<any>;
    /**
     * Converts the ensured data of the expected data type from the `store` data
     * format into the `base` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    protected storeToBase(data: unknown, context: Context): Promise<any>;
    /**
     * Determines whether the data is storable.
     *
     * @param context - The data context.
     *
     * @returns A promise that resolves with `true`, if the data is storable, and
     *   with `false` otherwise.
     *
     * @see Handler#store
     */
    protected isStorable(context: Context): Promise<boolean>;
    /**
     * Determines whether the data is outputable.
     *
     * @param context - The data context.
     *
     * @returns A promise that resolves with `true`, if the data is outputable,
     *   and with `false` otherwise.
     *
     * @see Handler#output
     */
    protected isOutputable(context: Context): Promise<boolean>;
    /**
     * Returns the data handler instance initialized from the specified data
     * definition.
     *
     * @param definition - The data definition to initialize the data handler
     *   from.
     * @param path - The data path the data handler to be initialized for.
     *
     * @returns A data handler instance.
     */
    protected initHandler(definition: Definition, [...path]?: Path): Handler;
    /**
     * Returns the data definition.
     *
     * @param Handler - The data handler constructor.
     * @param config - The data configuration.
     *
     * @returns A data definition.
     */
    static conf(Handler: HandlerConstructor, config: any): Definition;
    /**
     * Returns the data handler instance.
     *
     * @param Handler - The data handler constructor.
     * @param config - The data configuration.
     *
     * @returns A data handler instance.
     */
    static init<T>(Handler: HandlerConstructor<T>, config: any): Handler<T>;
}
