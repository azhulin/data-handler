"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The option data handler class.
 */
class Option extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * The options.
         */
        this.options = [];
        /**
         * The type of option keys.
         */
        this.keyType = "string";
        const config = settings.config;
        this.keyType = (_a = config.key_type) !== null && _a !== void 0 ? _a : this.keyType;
        if (!["number", "string"].includes(this.keyType)) {
            throw new Data.Error.Internal(`${this.name} configuration is invalid. Invalid 'key_type' property.`);
        }
        this.options = (_b = config.options) !== null && _b !== void 0 ? _b : this.options;
        if (!this.optionKeys().every(key => this.isValidKeyType(key))) {
            throw new Data.Error.Internal(`${this.name} configuration is invalid. Option keys don't match key type.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get id() {
        return this.keyType;
    }
    /**
     * {@inheritdoc}
     */
    get name() {
        return "string" === this.keyType ? "String" : "Number";
    }
    /**
     * {@inheritdoc}
     */
    async formatInputToBase(data, baseContext) {
        try {
            return await super.formatInputToBase(data, baseContext);
        }
        catch (error) {
            if (error instanceof Data.Error.Type) {
                throw new Data.Error.Option(this.path, this.options, this.keyType);
            }
            throw error;
        }
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return this.isValidKeyType(data) && this.optionKeys().includes(data);
    }
    /**
     * Determines whether the option key type is valid.
     */
    isValidKeyType(key) {
        return ("number" === this.keyType ? Data.Util.isIndex : Data.Util.isString)(key);
    }
    /**
     * Returns option keys.
     */
    optionKeys() {
        return Option.optionKeys(this.options);
    }
    /**
     * Returns option keys.
     */
    static optionKeys(options) {
        return Array.isArray(options) ? options : [...options.keys()];
    }
}
exports.default = Option;
exports.Handler = Option;
