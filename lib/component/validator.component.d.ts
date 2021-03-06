import { ErrorExpected } from "../error";
import type { Config, Context, Default, Options, Settings } from "../interface";
import type { Constraint, Path, Processor, Property } from "../type";
/**
 * The data validator class.
 *
 * The data handler base class containing the data validation functionality.
 */
export declare abstract class Validator {
    /**
     * The data handler ID.
     *
     * The unique data handler identifier. It is recommended to use dot-separated
     * snake case strings for naming data handler identifiers. For example, if
     * there is a String data handler with a `string` identifier, and this data
     * handler is inherited by the Email data handler, the identifier of the last
     * one can be `string.email`.
     */
    static id: string;
    /**
     * The data handler name.
     *
     * A human-readable data handler name. For example, `String`, or `Email`.
     */
    abstract name: string;
    /**
     * The data type ID.
     *
     * The unique identifier of the data handler's data type. It is recommended to
     * use dot-separated snake case strings for naming data type identifiers. The
     * data type identifier should only be overridden in the derived data handler,
     * if the `isValidType` method was overridden.
     *
     * @see Validator#isValidType
     */
    abstract type: string;
    /**
     * The data type name.
     *
     * A human-readable data type name. For example, `Number`, or `String`.
     */
    abstract typeName: string;
    /**
     * The data preparer library.
     *
     * The data preparer library contains predefined data preparers specific to
     * this data handler. The data preparers defined in the library can be used in
     * data handler configuration, and in `preparers` property of the data
     * handler.
     *
     * @see Config#preparers
     * @see Validator#preparers
     */
    static preparer: Processor.Library<unknown>;
    /**
     * The data processor library.
     *
     * The data processor library contains predefined data processors specific to
     * this data handler. The data processors defined in the library can be used
     * in data handler configuration, and in `preprocessors` and `postprocessors`
     * properties of the data handler.
     *
     * @see Config#preprocessors
     * @see Config#postprocessors
     * @see Validator#preprocessors
     * @see Validator#postprocessors
     */
    static processor: Processor.Library<any>;
    /**
     * The data constraint library.
     *
     * The data constraint library contains predefined data constraints specific
     * to this data handler. The data constraints defined in the library can be
     * used in data handler configuration, and in `constraints` property of the
     * data handler.
     *
     * @see Config#constraints
     * @see Validator#constraints
     */
    static constraint: Constraint.Library<any>;
    /**
     * The data preparers.
     *
     * The data preparers is a data processor list with `unknown` input and output
     * data type for preparing the data. The data preparers (from this property
     * with appended data preparers from the data handler configuration, if any)
     * are ran during validation after the data value is ensured (not `undefined`
     * and not `null`), and before the data value is validated. So the data
     * preparers is a place to cast a data value to the desired type. For example,
     * if expected input for a numeric data handler is a string representation of
     * a number, the data preparer can be used to convert a string into a number.
     * Additional data preparers can be added to the run in the data handler
     * configuration. These data preparers will run after the data preparers from
     * this property.
     *
     * @see Config#preparers
     * @see Validator.preparer
     */
    protected preparers: Processor.List<unknown>;
    /**
     * The data preprocessors.
     *
     * The data preprocessors is a data processor list with valid for this data
     * handler input and output data type for preprocessing the data. The data
     * preprocessors (from this property with appended data preprocessors from the
     * data handler configuration, if any) are ran during validation after the
     * data value is validated, and before the data constraints check is
     * performed. So the data preprocessors is a place to transform the data
     * without changing its type before the data constraints check. For example,
     * `trim` string data processor can be used as a data prerocessor in a string
     * data handler before the string length data constraint check.
     * Additional data preprocessors can be added to the run in the data handler
     * configuration. They will run after the data preprocessors from this
     * property.
     *
     * @see Config#preprocessors
     * @see Validator.processor
     */
    protected preprocessors: Processor.List<any>;
    /**
     * The data constraints.
     *
     * The data constraints is a data constraint list to check the data of
     * specific to this data handler type. The data constraints (from this
     * property with appended data constraints from the data handler
     * configuration, if any) are ran during validation after the data
     * preprocessing is performed, and before the data postprocessing is
     * performed. For example, the data constraints can be used to check whether
     * the numeric data value is greater then specific value in a numeric data
     * handler, or to check whether the string data value has specific length in a
     * string data handler.
     * Additional data constraints can be added to the run in the data handler
     * configuration. They will run after the data constraints from this property.
     *
     * @see Config#constraints
     * @see Validator.constraint
     */
    protected constraints: Constraint.List<any>;
    /**
     * The data postprocessors.
     *
     * The data postprocessors is a data processor list with valid for this data
     * handler input and output data type for postprocessing the data. The data
     * postprocessors (from this property with appended data postprocessors from
     * the data handler configuration, if any) are ran during validation after the
     * data constraints check is performed, and before the data is returned. So
     * the data postprocessors is a place to transform the data without changing
     * its type before the data is returned. For example, a data postprocessor can
     * be used in a list data handler to sort the list items.
     * Additional data postprocessors can be added to the run in the data handler
     * configuration. They will run after the data postprocessors from this
     * property.
     *
     * @see Config#postprocessors
     * @see Validator.processor
     */
    protected postprocessors: Processor.List<any>;
    /**
     * The data default value behaviors.
     *
     * Some or all data default value behaviors can be overridden in the data
     * handler configuration.
     *
     * @see Config#default
     */
    protected default: Default;
    /**
     * The `input` data property.
     *
     * The `input` data property determines whether to accept or ignore the
     * provided data value when validating data. If the computed value of the
     * `input` data property is:
     * - `true`: the data value is accepted;
     * - `false`: the data value is taken from the `create` or `update` data
     *   default value behavior depending on the data mode. If the data value was
     *   provided, the warning about the ignored data value is generated.
     * By default, the `input` data property is `true`. It can be overridden in
     * the data handler configuration.
     *
     * @see Config#input
     * @see Default
     * @see Mode
     */
    protected input: Property<boolean>;
    /**
     * The `require` data property.
     *
     * The `require` data property determines whether the data value is required
     * when validating data. If the computed value of the `require` data property
     * is `true`, the data value is required, otherwise it is optional.
     * If the computed value of the `require` data property is:
     * - `true`, in `create` data mode, data value is not provided (`undefined`):
     *   the data required error is thrown;
     * - `true`, in `create` data mode, data value is `null`: the data empty error
     *   is thrown;
     * - `true`, in `update` data mode, data value is not provided (`undefined`):
     *   the data value is taken from the `update` data default value behavior
     *   (original data value by default), and if the obtained value is
     *   `undefined` or `null`, the data required error is thrown;
     * - `true`, in `update` data mode, data value is `null`: the data empty error
     *   is thrown;
     * - `false`, in `create` data mode, data value is not provided (`undefined`):
     *   the data value is taken from the `create` data default value behavior
     *   (`null` by default);
     * - `false`, in `create` data mode, data value is `null`: the data value is
     *   taken from the `nulled` data default value behavior (`null` by default);
     * - `false`, in `update` data mode, data value is not provided (`undefined`):
     *   the data value is taken from the `update` data default value behavior
     *   (original data value by default);
     * - `false`, in `update` data mode, data value is `null`: the data value is
     *   taken from the `nulled` data default value behavior (`null` by default).
     * By default, the `require` data property is `true`. It can be overridden in
     * the data handler configuration.
     *
     * @see Config#require
     * @see Default
     * @see Mode
     */
    protected require: Property<boolean>;
    /**
     * The data configuration.
     */
    protected config: Config;
    /**
     * The data path.
     *
     * The path of this data handler's data in the data tree. The data path can be
     * accessed from the data context.
     *
     * @see Context#path
     * @see Settings#path
     */
    readonly path: Path;
    /**
     * The data warnings.
     *
     * The data warnings is an array shared among all the data handlers during the
     * data formatting run that can be accessed from the data context. The data
     * warnings array contains non-critical data errors collected during the data
     * formatting run. The data warnings can be used to notify the user of minor
     * problems. For example, when validating data, the user provided a value for
     * the data that is configured as not inputable, and in this case the user can
     * be warned that the provided data value was ignored.
     *
     * @see Context#warnings
     * @see Settings#warnings
     */
    warnings: ErrorExpected[];
    /**
     * The data storage.
     *
     * The data storage is an object shared among all the data handlers during the
     * data formatting run that can be accessed from the data context. It can be
     * used to pass some custom data from one data handler to another. For
     * example, if several data handlers need to load some independent external
     * data, only the first one can load the data and put it into the data storage
     * under some agreed key and the other ones can retrive this data from the
     * data storage.
     *
     * @see Context#storage
     * @see Settings#storage
     */
    protected storage: Record<string, unknown>;
    /**
     * The source data.
     *
     * The source data is a value shared among all the data handlers during the
     * data formatting run that can be accessed from the data context. The source
     * data is a data the formatting is performed from. For example, when
     * validating data, the formatting is performed from the `input` data format
     * into the `base` data format, and in this case the source data is a data in
     * the `input` data format.
     *
     * @see Context#source
     * @see Settings#source
     */
    protected source: unknown;
    /**
     * The result data.
     *
     * The result data is a value shared among all the data handlers during the
     * data formatting run that can be accessed from the data context. The result
     * data is a data the formatting is performed to. For example, when validating
     * data, the formatting is performed from the `input` data format into the
     * `base` data format, and in this case the result data is a data in the
     * `base` data format.
     *
     * @see Context#result
     * @see Settings#result
     */
    protected result: unknown;
    /**
     * Constructor for the Validator object.
     *
     * @param config - The data configuration.
     * @param settings - The data settings.
     */
    constructor(config: Config, settings?: Settings);
    /**
     * Resets the data handler state.
     *
     * @param data - The data to set as a new source data.
     */
    protected reset(data: unknown): void;
    /**
     * Validates the provided data and returns the validated data.
     *
     * The data validation process can be divided into the following steps:
     *   1. Ensuring the data:
     *   - handling the inputable data property (see `isInputable` method);
     *   - handling the omitted data (see `isRequired` method);
     *   - handling the `null` data (see `isRequired` method).
     *   2. Preparing the data (see `preparers` data property).
     *   3. Validating the type of the data (see `isValidType` method).
     *   4. Preprocessing the data (see `preprocessors` data property).
     *   5. Checking data constraints (see `checkConstraints` method).
     *   6. Postprocessing the data (see `postprocessors` data property).
     *
     * @param data - The data to validate.
     * @param options - The data options.
     *
     * @returns A promise that resolves with a validated data.
     *
     * @throws {@link ErrorRequired}
     * Thrown if required data value is omitted in `create` data mode, or if
     * required data value is omitted in `update` data mode, and the data default
     * value behavior returned an empty value.
     *
     * @throws {@link ErrorEmpty}
     * Thrown if required data value is `null`.
     *
     * @throws {@link ErrorType}
     * Thrown if ensured data value has invalid type.
     *
     * @see Validator#isInputable
     * @see Validator#isRequired
     * @see Validator#preparers
     * @see Validator#isValidType
     * @see Validator#preprocessors
     * @see Validator#checkConstraints
     * @see Validator#postprocessors
     */
    validate(data: unknown, options?: Options): Promise<unknown>;
    /**
     * Returns the data context.
     *
     * @param options - The data options.
     *
     * @returns A data context.
     *
     * @throws {@link ErrorUnexpected}
     * Thrown if the `data` option is not specified in `update` data mode.
     */
    protected getContext(options?: Options): Context;
    /**
     * Determines whether the provided data has an expected data type.
     *
     * Overriding this method in derived data handler produces a new data type, so
     * the `type` and `typeName` properties of the derived data handler must be
     * overridden as well. In some cases creating a new data constraint can
     * replace the need to override this method. The choosen way affects the
     * errors that occur during validation.
     * For example, there is a String data handler with `string` type ID and
     * handler ID, and `String` type name and handler name. There are two ways to
     * create a new data handler for the email address validation, inheriting the
     * String data handler:
     *   1. Add an email validation data constraint to the `constraints` property.
     *   2. Override the `isValidType` method, adding the email validation logic.
     * In both cases a new Email data handler with `string.email` handler ID and
     * `Email` handler name is created. In the first case the data type was not
     * changed (`string`, `String`), but in the second case it was changed
     * (`string.email`, `Email`), because the `isValidType` method was overridden.
     * Let pass a 123 value for validation to the Email data handler:
     *   1. The `data.type` error: `Value has invalid type. String expected.`.
     *   2. The `data.type` error: `Value has invalid type. Email expected.`.
     * Now let pass an "abc" value for validation to the Email data handler:
     *   1. The `data.constraint` error on a `String` data type.
     *   2. The `data.type` error: `Value has invalid type. Email expected.`.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type, and
     *   `false` otherwise.
     *
     * @see Validator#type
     * @see Validator#typeName
     * @see Validator#constraints
     */
    protected abstract isValidType(data: unknown): boolean;
    /**
     * Handles the ensured data of the expected data type.
     *
     * This includes running data preprocessors, checking data constraints, and
     * running postprocessors.
     *
     * @param data - The data to handle.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a handled data.
     */
    protected handle(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs the data processors on the provided data.
     *
     * @param type - The type of the data processors to run.
     * @param data - The data to run data processors on.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a processed data.
     */
    protected run(type: "preparers" | "preprocessors" | "postprocessors", data: unknown, context: Context): Promise<unknown>;
    /**
     * Checks the data constraints on the provided data.
     *
     * @param data - The data to check the data constraints on.
     * @param context - The data context.
     *
     * @throws {@link ErrorConstraint}
     * Thrown if the data failed one of the data constraint checks.
     */
    protected checkConstraints(data: unknown, context: Context): Promise<void>;
    /**
     * Determines whether the source data has a value under the current data path.
     *
     * @returns `true`, if the source data has a value under the current data
     *   path, and `false` otherwise.
     */
    protected inSource(): boolean;
    /**
     * Determines whether this data handler is a root data handler.
     *
     * @returns `true`, if this data handler is a root data handler, and `false`
     *   otherwise.
     */
    protected isRoot(): boolean;
    /**
     * Determines whether the specified data is empty (`undefined` or `null`).
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is empty, and `false` otherwise.
     */
    protected isEmpty(data: unknown): boolean;
    /**
     * Determines whether the specified data is `undefined`.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is `undefined`, and `false`
     *   otherwise.
     */
    protected isUndefined(data: unknown): boolean;
    /**
     * Determines whether the specified data is `null`.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is `null`, and `false` otherwise.
     */
    protected isNull(data: unknown): boolean;
    /**
     * Determines whether the data is inputable.
     *
     * @param context - The data context.
     *
     * @returns A promise that resolves with `true`, if the data is inputable, and
     *   with `false` otherwise.
     *
     * @see Validator#input
     */
    protected isInputable(context: Context): Promise<boolean>;
    /**
     * Determines whether the data is required.
     *
     * @param context - The data context.
     *
     * @returns A promise that resolves with `true`, if the data is required, and
     *   with `false` otherwise.
     *
     * @see Validator#require
     */
    protected isRequired(context: Context): Promise<boolean>;
    /**
     * Returns the data default value behavior computed value.
     *
     * @param context - The data context.
     * @param behavior - The data default value behavior type.
     *
     * @returns A promise that resolves with a data, computed by the data default
     *   value behavior.
     */
    protected getDefault(context: Context, behavior?: keyof Default): Promise<unknown>;
    /**
     * Returns the computed data property.
     *
     * @param property - The data property to compute.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a computed data property.
     */
    protected getProperty<T>(property: Property<T>, context: Context): Promise<T>;
}
