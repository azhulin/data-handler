"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_validator_1 = require("@azhulin/data-validator");
const error_1 = require("./error");
const Format_1 = require("./Format");
/**
 * The data handler class.
 */
let Handler = /** @class */ (() => {
    class Handler extends data_validator_1.Handler {
        /**
         * Constructor for the Handler object.
         */
        constructor(settings) {
            var _a, _b, _c;
            super(settings);
            /**
             * [$] Whether the data should be present in "store" format.
             */
            this.store = true;
            /**
             * [#] Whether the data should be present in "output" format.
             */
            this.output = true;
            this.process = this.inputToBase;
            const config = (_a = settings.config) !== null && _a !== void 0 ? _a : {};
            this.store = (_b = config.store) !== null && _b !== void 0 ? _b : this.store;
            this.output = (_c = config.output) !== null && _c !== void 0 ? _c : this.output;
        }
        /**
         * {@inheritdoc}
         */
        async validate(data, baseContext) {
            return this.inInput(data).toBase(baseContext);
        }
        /**
         * Initializes the handler with data in input format.
         */
        inInput(data) {
            return this.initData(Format_1.default.input, data);
        }
        /**
         * Initializes the handler with data in base format.
         */
        inBase(data) {
            return this.initData(Format_1.default.base, data);
        }
        /**
         * Initializes the handler with data in store format.
         */
        inStore(data) {
            return this.initData(Format_1.default.store, data);
        }
        /**
         * Initializes the handler with data in specified format.
         */
        initData(format, data) {
            this.format = format;
            this.data = data;
            return this;
        }
        /**
         * Returns the data in base format.
         */
        async toBase(baseContext) {
            return this.formatData(Format_1.default.base, baseContext);
        }
        /**
         * Returns the data in store format.
         */
        async toStore(baseContext) {
            return this.formatData(Format_1.default.store, baseContext);
        }
        /**
         * Returns the data in output format.
         */
        async toOutput(baseContext) {
            return this.formatData(Format_1.default.output, baseContext);
        }
        /**
         * Returns data in specified format.
         */
        async formatData(format, baseContext) {
            if (this.format === format) {
                return this.data;
            }
            switch (this.format + format) {
                case Format_1.default.input + Format_1.default.base:
                    this.data = await this.formatInputToBase(this.data, baseContext);
                    break;
                case Format_1.default.base + Format_1.default.store:
                    this.data = await this.formatBaseToStore(this.data, baseContext);
                    break;
                case Format_1.default.base + Format_1.default.output:
                    return this.formatBaseToOutput(this.data, baseContext);
                case Format_1.default.store + Format_1.default.base:
                    this.data = await this.formatStoreToBase(this.data, baseContext);
                    break;
                default:
                    throw new error_1.default.Internal("Invalid data format conversion.");
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
        async formatInputToBase(data, baseContext) {
            return super.validate(data, baseContext);
        }
        /**
         * Returns store data from base data.
         */
        async formatBaseToStore(data, baseContext) {
            const context = await this.getContext(baseContext);
            if (!await this.isStorable(context)) {
                return undefined;
            }
            if (this.isOmitted(data) || this.isEmpty(data)) {
                return data;
            }
            if (this.isValidBaseData(data)) {
                return this.baseToStore(data, context);
            }
            throw new error_1.default.InternalFormat(this.path, this.id, Format_1.default.base, Format_1.default.store, data);
        }
        /**
         * Returns output data from base data.
         */
        async formatBaseToOutput(data, baseContext) {
            const context = await this.getContext(baseContext);
            if (!await this.isOutputable(context)) {
                return undefined;
            }
            if (this.isOmitted(data) || this.isEmpty(data)) {
                return data;
            }
            if (this.isValidBaseData(data)) {
                return this.baseToOutput(data, context);
            }
            throw new error_1.default.InternalFormat(this.path, this.id, Format_1.default.base, Format_1.default.output, data);
        }
        /**
         * Returns base data from store data.
         */
        async formatStoreToBase(data, baseContext) {
            const context = await this.getContext(baseContext);
            if (!await this.isStorable(context) || this.isOmitted(data)) {
                data = await this.getDefault(context);
            }
            if (this.isOmitted(data) || this.isEmpty(data)) {
                return data;
            }
            if (this.isValidStoreData(data)) {
                return this.storeToBase(data, context);
            }
            throw new error_1.default.InternalFormat(this.path, this.id, Format_1.default.store, Format_1.default.base, data);
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
         * {@inheritdoc}
         */
        initHandler(definition, path) {
            return super.initHandler(definition, path);
        }
    }
    /**
     * {@inheritdoc}
     */
    Handler.modifiers = Object.assign(Object.assign({}, data_validator_1.Handler.modifiers), { "$": config => config.store = false, "#": config => config.output = false });
    return Handler;
})();
exports.default = Handler;
