"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const enum_1 = require("../enum");
const error_1 = require("../error");
const util_1 = require("../util");
/**
 * The data validator class.
 *
 * The data handler base class containing the data validation functionality.
 */
class Validator {
    /**
     * Constructor for the Validator object.
     *
     * @param config - The data configuration.
     * @param settings - The data settings.
     */
    constructor(config, settings) {
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
        this.preparers = [];
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
        this.preprocessors = [];
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
        this.constraints = [];
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
        this.postprocessors = [];
        /**
         * The data default value behaviors.
         *
         * Some or all data default value behaviors can be overridden in the data
         * handler configuration.
         *
         * @see Config#default
         */
        this.default = {
            /**
             * This data default value behavior is used as a fallback for other
             * behaviors.
             */
            value: null,
            /**
             * This data default value behavior falls back to the `value` behavior.
             */
            create: (context) => this.getProperty(this.default.value, context),
            /**
             * This data default value behavior retrieves the value from the original
             * data, and if the retrieved value is undefined or empty, it falls back to
             * the `value` behavior.
             */
            update: (context) => { var _a; return (_a = context.original()) !== null && _a !== void 0 ? _a : this.getProperty(this.default.value, context); },
            /**
             * This data default value behavior falls back to the `create` behavior.
             */
            nulled: (context) => this.getProperty(this.default.create, context),
            /**
             * This data default value behavior falls back to the `value` behavior.
             */
            read: (context) => this.getProperty(this.default.value, context),
        };
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
        this.input = true;
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
        this.require = true;
        /**
         * The data path.
         *
         * The path of this data handler's data in the data tree. The data path can be
         * accessed from the data context.
         *
         * @see Context#path
         * @see Settings#path
         */
        this.path = [];
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
        this.warnings = [];
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
        this.storage = {};
        this.config = config;
        this.default = Object.assign(Object.assign({}, this.default), config.default);
        const { path, warnings, storage, source, result } = settings !== null && settings !== void 0 ? settings : {};
        this.path = path !== null && path !== void 0 ? path : this.path;
        this.warnings = warnings !== null && warnings !== void 0 ? warnings : this.warnings;
        this.storage = storage !== null && storage !== void 0 ? storage : this.storage;
        this.source = source;
        this.result = result;
    }
    /**
     * The data handler ID.
     *
     * The unique data handler identifier. It is recommended to use dot-separated
     * snake case strings for naming data handler identifiers. For example, if
     * there is a String data handler with a `string` identifier, and this data
     * handler is inherited by the Email data handler, the identifier of the last
     * one can be `string.email`.
     */
    get id() { return this.type; }
    /**
     * The data handler name.
     *
     * A human-readable data handler name. For example, `String`, or `Email`.
     */
    get name() { return this.typeName; }
    /**
     * The data type description.
     */
    get typeDesc() { return ""; }
    /**
     * Resets the data handler state.
     *
     * @param data - The data to set as a new source data.
     */
    reset(data) {
        if (this.isRoot()) {
            this.warnings = [];
            this.storage = {};
            this.source = data;
            this.result = undefined;
        }
    }
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
    async validate(data, options) {
        this.reset(data);
        const context = this.getContext(options);
        if (!await this.isInputable(context)) {
            !this.isOmitted(data) && this.inSource()
                && this.warnings.push(new error_1.ErrorIgnored(this.path));
            data = await this.getDefault(context);
        }
        else if (this.isOmitted(data)) {
            const required = await this.isRequired(context);
            if (required && !context.update) {
                throw new error_1.ErrorRequired(this);
            }
            data = await this.getDefault(context);
            if (required && this.isEmpty(data)) {
                throw new error_1.ErrorRequired(this);
            }
        }
        else if (this.isNull(data)) {
            if (await this.isRequired(context)) {
                throw new error_1.ErrorEmpty(this);
            }
            data = await this.getDefault(context, "nulled");
        }
        if (!this.isEmpty(data)) {
            data = await this.run("preparers", data, context);
            if (!this.isValidType(data)) {
                throw new error_1.ErrorType(this);
            }
            data = this.handle(data, context);
        }
        return data;
    }
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
    getContext(options = {}) {
        const { mode = enum_1.Mode.create, data } = options;
        const update = enum_1.Mode.update === mode;
        if (update && !data) {
            throw new error_1.ErrorUnexpected(`Context data is required in ${mode} mode.`);
        }
        return Object.assign(Object.assign({}, options), { mode, create: !update, update, handler: this, path: this.path, warnings: this.warnings, storage: (key, value) => undefined !== value ? this.storage[key] = value : this.storage[key], source: (field) => util_1.extract(this.source, util_1.pathResolve(this.path, field)), result: (field) => util_1.extract(this.result, util_1.pathResolve(this.path, field)), original: (field) => util_1.extract(data, util_1.pathResolve(this.path, field)) });
    }
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
    async handle(data, context) {
        data = await this.run("preprocessors", data, context);
        await this.checkConstraints(data, context);
        return this.run("postprocessors", data, context);
    }
    /**
     * Runs the data processors on the provided data.
     *
     * @param type - The type of the data processors to run.
     * @param data - The data to run data processors on.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a processed data.
     */
    async run(type, data, context) {
        var _a;
        const processors = [];
        for (const item of [...this[type], ...(_a = this.config[type]) !== null && _a !== void 0 ? _a : []]) {
            processors.push(...Array.isArray(item) ? item[0](context) : [item]);
        }
        for (const processor of processors) {
            data = await processor(data, context);
        }
        return data;
    }
    /**
     * Checks the data constraints on the provided data.
     *
     * @param data - The data to check the data constraints on.
     * @param context - The data context.
     *
     * @throws {@link ErrorConstraint}
     * Thrown if the data failed one of the data constraint checks.
     */
    async checkConstraints(data, context) {
        var _a;
        const constraints = [];
        for (const item of [...this.constraints, ...(_a = this.config.constraints) !== null && _a !== void 0 ? _a : []]) {
            if ("function" === typeof item) {
                constraints.push(...item(context));
            }
            else if (1 === item.length) {
                const [[id, func]] = item;
                constraints.push([id, func, true]);
            }
            else {
                constraints.push(item);
            }
        }
        for (const [id, func, skippable] of constraints) {
            const { update, original } = context;
            if (skippable && update && data === original()) {
                continue;
            }
            const result = await func(data, context);
            if (null !== result) {
                const [message, details] = "string" === typeof result ? [result] : result;
                throw new error_1.ErrorConstraint(this, id, message, details);
            }
        }
    }
    /**
     * Determines whether the source data has a value under the current data path.
     *
     * @returns `true`, if the source data has a value under the current data
     *   path, and `false` otherwise.
     */
    inSource() {
        return undefined !== util_1.extract(this.source, this.path);
    }
    /**
     * Determines whether this data handler is a root data handler.
     *
     * @returns `true`, if this data handler is a root data handler, and `false`
     *   otherwise.
     */
    isRoot() {
        return !this.path.length;
    }
    /**
     * Determines whether the specified data is empty (`undefined` or `null`).
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is empty, and `false` otherwise.
     */
    isEmpty(data) {
        return this.isOmitted(data) || this.isNull(data);
    }
    /**
     * Determines whether the specified data is omitted (`undefined`).
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is omitted, and `false` otherwise.
     */
    isOmitted(data) {
        return undefined === data;
    }
    /**
     * Determines whether the specified data is `null`.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the specified data is `null`, and `false` otherwise.
     */
    isNull(data) {
        return null === data;
    }
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
    async isInputable(context) {
        var _a;
        return this.getProperty((_a = this.config.input) !== null && _a !== void 0 ? _a : this.input, context);
    }
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
    async isRequired(context) {
        var _a;
        return this.getProperty((_a = this.config.require) !== null && _a !== void 0 ? _a : this.require, context);
    }
    /**
     * Returns the data default value behavior computed value.
     *
     * @param context - The data context.
     * @param behavior - The data default value behavior type.
     *
     * @returns A promise that resolves with a data, computed by the data default
     *   value behavior.
     */
    async getDefault(context, behavior) {
        return this.getProperty(this.default[behavior !== null && behavior !== void 0 ? behavior : context.mode], context);
    }
    /**
     * Returns the computed data property.
     *
     * @param property - The data property to compute.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a computed data property.
     */
    async getProperty(property, context) {
        return "function" === typeof property
            ? property(context)
            : property;
    }
}
exports.Validator = Validator;
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
Validator.preparer = {};
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
Validator.processor = {};
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
Validator.constraint = {};
