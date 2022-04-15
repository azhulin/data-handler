"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const component_1 = require("../component");
const enum_1 = require("../enum");
const error_1 = require("../error");
/**
 * The data handler class.
 */
class Handler extends component_1.Validator {
    /**
     * Constructor for the Handler object.
     */
    constructor(config, settings) {
        var _a, _b;
        super(config, settings);
        /**
         * The current data format.
         */
        this.format = enum_1.Format.base;
        /**
         * Whether the data should be present in "store" format.
         */
        this.store = true;
        /**
         * Whether the data should be present in "output" format.
         */
        this.output = true;
        this.process = this.inputToBase;
        this.store = (_a = config.store) !== null && _a !== void 0 ? _a : this.store;
        this.output = (_b = config.output) !== null && _b !== void 0 ? _b : this.output;
    }
    /**
     * {@inheritdoc}
     */
    async validate(data, options) {
        return this.inInput(data).toBase(options);
    }
    /**
     * Initializes the handler with data in input format.
     */
    inInput(data) {
        return this.initData(enum_1.Format.input, data);
    }
    /**
     * Initializes the handler with data in base format.
     */
    inBase(data) {
        return this.initData(enum_1.Format.base, data);
    }
    /**
     * Initializes the handler with data in store format.
     */
    inStore(data) {
        return this.initData(enum_1.Format.store, data);
    }
    /**
     * Initializes the handler with data in specified format.
     */
    initData(format, data) {
        this.reset(data);
        this.format = format;
        this.data = data;
        return this;
    }
    /**
     * Returns the data in base format.
     */
    async toBase(options) {
        return this.formatData(enum_1.Format.base, options);
    }
    /**
     * Returns the data in store format.
     */
    async toStore(options) {
        return this.formatData(enum_1.Format.store, options);
    }
    /**
     * Returns the data in output format.
     */
    async toOutput(options) {
        return this.formatData(enum_1.Format.output, options);
    }
    /**
     * Returns data in specified format.
     */
    async formatData(format, options) {
        if (this.format === format) {
            return this.data;
        }
        this.reset(this.data);
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
                throw new error_1.ErrorUnexpected("Invalid data format conversion.");
        }
        this.format = format;
        return this.data;
    }
    /**
     * Returns the current data format.
     */
    getFormat() {
        return this.format;
    }
    /**
     * Returns the data in current format.
     */
    getData() {
        return this.data;
    }
    /**
     * Returns the data in base format from data in input format.
     */
    async formatInputToBase(data, options) {
        return super.validate(data, options);
    }
    /**
     * Returns store data from base data.
     */
    async formatBaseToStore(data, options) {
        const context = await this.getContext(options);
        if (!await this.isStorable(context)) {
            return undefined;
        }
        if (this.isOmitted(data) || this.isEmpty(data)) {
            return data;
        }
        if (this.isValidBaseData(data)) {
            return this.baseToStore(data, context);
        }
        throw new error_1.ErrorUnexpectedFormatting(this.path, this.id, enum_1.Format.base, enum_1.Format.store, data);
    }
    /**
     * Returns output data from base data.
     */
    async formatBaseToOutput(data, options) {
        const context = await this.getContext(options);
        if (!await this.isOutputable(context)) {
            return undefined;
        }
        if (this.isOmitted(data) || this.isEmpty(data)) {
            return data;
        }
        if (this.isValidBaseData(data)) {
            return this.baseToOutput(data, context);
        }
        throw new error_1.ErrorUnexpectedFormatting(this.path, this.id, enum_1.Format.base, enum_1.Format.output, data);
    }
    /**
     * Returns base data from store data.
     */
    async formatStoreToBase(data, options) {
        const context = await this.getContext(options);
        if (!await this.isStorable(context) || this.isOmitted(data)) {
            data = await this.getDefault(context, "read");
        }
        if (this.isOmitted(data) || this.isEmpty(data)) {
            return data;
        }
        if (this.isValidStoreData(data)) {
            return this.storeToBase(data, context);
        }
        throw new error_1.ErrorUnexpectedFormatting(this.path, this.id, enum_1.Format.store, enum_1.Format.base, data);
    }
    /**
     * Determines whether the data is in expected input format.
     */
    isValidInputData(data) {
        return this.isValid(data);
    }
    /**
     * Determines whether the data is in expected base format.
     */
    isValidBaseData(data) {
        return this.isValidInputData(data);
    }
    /**
     * Determines whether the data is in expected store format.
     */
    isValidStoreData(data) {
        return this.isValidBaseData(data);
    }
    /**
     * Converts data in input format to data in base format.
     */
    async inputToBase(data, context) {
        return super.process(data, context);
    }
    /**
     * Converts data in base format to data in store format.
     */
    async baseToStore(data, context) {
        return data;
    }
    /**
     * Converts data in base format to data in output format.
     */
    async baseToOutput(data, context) {
        return data;
    }
    /**
     * Converts data in store format to data in base format.
     */
    async storeToBase(data, context) {
        return data;
    }
    /**
     * Returns "store" flag value.
     */
    async isStorable(context) {
        return this.getProperty("store", context);
    }
    /**
     * Returns "output" flag value.
     */
    async isOutputable(context) {
        return this.getProperty("output", context);
    }
    /**
     * Returns the data handler for specified data definition.
     */
    initHandler(definition, path = []) {
        const { Handler, config } = "config" in definition ? definition : Object.assign(Object.assign({}, definition), { config: {} });
        const { source, result, storage, warnings } = this;
        return new Handler(config, { path, source, result, storage, warnings });
    }
}
exports.Handler = Handler;
