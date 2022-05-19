"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const component_1 = require("../component");
const enum_1 = require("../enum");
const error_1 = require("../error");
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
class Handler extends component_1.Validator {
    constructor() {
        super(...arguments);
        /**
         * The current data format.
         */
        this.format = enum_1.Format.base;
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
        this.store = true;
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
        this.output = true;
        this.handle = this.inputToBase;
    }
    /**
     * {@inheritdoc}
     */
    async validate(data, options) {
        return this.inInput(data).toBase(options);
    }
    /**
     * Initializes the data handler with the provided data in `input` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inInput(data) {
        return this.in(enum_1.Format.input, data);
    }
    /**
     * Initializes the data handler with the provided data in `base` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inBase(data) {
        return this.in(enum_1.Format.base, data);
    }
    /**
     * Initializes the data handler with the provided data in `store` data format.
     *
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     *
     * @see Format
     */
    inStore(data) {
        return this.in(enum_1.Format.store, data);
    }
    /**
     * Initializes the data handler with the provided data in specified data
     * format.
     *
     * @param format - The data format to initalize the data handler in.
     * @param data - The data to initialize the data handler with.
     *
     * @returns This data handler.
     */
    in(format, data) {
        this.reset(data);
        this.format = format;
        this.data = data;
        return this;
    }
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
    async toBase(options) {
        return this.to(enum_1.Format.base, options);
    }
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
    async toStore(options) {
        return this.to(enum_1.Format.store, options);
    }
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
    async toOutput(options) {
        return this.to(enum_1.Format.output, options);
    }
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
    async to(format, options) {
        if (this.format === format) {
            return this.data;
        }
        switch (this.format + format) {
            case enum_1.Format.input + enum_1.Format.base:
                this.data = await this.formatInputToBase(this.data, options);
                break;
            case enum_1.Format.store + enum_1.Format.base:
                this.data = await this.formatStoreToBase(this.data, options);
                break;
            case enum_1.Format.base + enum_1.Format.store:
                return this.formatBaseToStore(this.data, options);
            case enum_1.Format.base + enum_1.Format.output:
                return this.formatBaseToOutput(this.data, options);
            default:
                throw new error_1.ErrorUnexpected("Invalid data format transition.");
        }
        this.format = format;
        return this.data;
    }
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
    async formatInputToBase(data, options) {
        return super.validate(data, options);
    }
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
    async formatBaseToStore(data, options) {
        const context = this.getContext(options);
        if (!await this.isStorable(context)) {
            data = undefined;
        }
        if (!this.isEmpty(data)) {
            if (!this.isValidTypeBase(data)) {
                throw new error_1.ErrorUnexpectedFormatting(this, enum_1.Format.base, enum_1.Format.store, data);
            }
            data = this.baseToStore(data, context);
        }
        return data;
    }
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
    async formatBaseToOutput(data, options) {
        const context = this.getContext(options);
        if (!await this.isOutputable(context)) {
            data = undefined;
        }
        if (!this.isEmpty(data)) {
            if (!this.isValidTypeBase(data)) {
                throw new error_1.ErrorUnexpectedFormatting(this, enum_1.Format.base, enum_1.Format.output, data);
            }
            data = this.baseToOutput(data, context);
        }
        return data;
    }
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
    async formatStoreToBase(data, options) {
        const context = this.getContext(options);
        if (!await this.isStorable(context) || this.isUndefined(data)) {
            data = await this.getDefault(context, "read");
        }
        if (!this.isEmpty(data)) {
            if (!this.isValidTypeStore(data)) {
                throw new error_1.ErrorUnexpectedFormatting(this, enum_1.Format.store, enum_1.Format.base, data);
            }
            data = this.storeToBase(data, context);
        }
        return data;
    }
    /**
     * Determines whether the provided data has an expected data type for the
     * `input` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `input` data format, and `false` otherwise.
     */
    isValidTypeInput(data) {
        return this.isValidType(data);
    }
    /**
     * Determines whether the provided data has an expected data type for the
     * `base` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `base` data format, and `false` otherwise.
     */
    isValidTypeBase(data) {
        return this.isValidTypeInput(data);
    }
    /**
     * Determines whether the provided data has an expected data type for the
     * `store` data format.
     *
     * @param data - The data to check.
     *
     * @returns `true`, if the provided data has an expected data type for the
     *   `store` data format, and `false` otherwise.
     */
    isValidTypeStore(data) {
        return this.isValidTypeBase(data);
    }
    /**
     * Converts the ensured data of the expected data type from the `input` data
     * format into the `base` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    async inputToBase(data, context) {
        return super.handle(data, context);
    }
    /**
     * Converts the ensured data of the expected data type from the `base` data
     * format into the `store` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    async baseToStore(data, context) {
        return data;
    }
    /**
     * Converts the ensured data of the expected data type from the `base` data
     * format into the `output` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    async baseToOutput(data, context) {
        return data;
    }
    /**
     * Converts the ensured data of the expected data type from the `store` data
     * format into the `base` data format.
     *
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    async storeToBase(data, context) {
        return data;
    }
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
    async isStorable(context) {
        var _a;
        return this.getProperty((_a = this.config.store) !== null && _a !== void 0 ? _a : this.store, context);
    }
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
    async isOutputable(context) {
        var _a;
        return this.getProperty((_a = this.config.output) !== null && _a !== void 0 ? _a : this.output, context);
    }
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
    initHandler(definition, [...path] = []) {
        const { Handler, config } = "config" in definition ? definition : Object.assign(Object.assign({}, definition), { config: {} });
        const { warnings, storage, source, result } = this;
        return new Handler(config, { path, warnings, storage, source, result });
    }
    /**
     * Returns the data definition.
     *
     * @param Handler - The data handler constructor.
     * @param config - The data configuration.
     *
     * @returns A data definition.
     */
    static conf(Handler, config) {
        return { Handler, config };
    }
    /**
     * Returns the data handler instance.
     *
     * @param Handler - The data handler constructor.
     * @param config - The data configuration.
     *
     * @returns A data handler instance.
     */
    static init(Handler, config) {
        return new Handler(config);
    }
}
exports.Handler = Handler;
