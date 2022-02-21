"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$String = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class $String extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get id() { return "string"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "String"; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "string" === typeof data;
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const original = data;
        data = await super.inputToBase(data, context);
        original !== data
            && this.warn(new Data.ErrorAdapted(this.path, original, data));
        return data;
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$String, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $String({ config });
    }
}
exports.$String = $String;
/**
 * {@inheritdoc}
 */
$String.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { trimmed: [
        "trimmed",
        (data) => data === data.trim() ? null : "Value should be trimmed.",
    ], length: {
        eq: (length) => [
            `length=${length}`,
            data => data.length === length ? null : `Length should be equal to ${length}.`,
        ],
        gt: (length) => [
            `length>${length}`,
            data => data.length > length ? null : `Length should be greater than ${length}.`,
        ],
        gte: (length) => [
            `length>=${length}`,
            data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
        ],
        lt: (length) => [
            `length<${length}`,
            data => data.length < length ? null : `Length should be lesser than ${length}.`,
        ],
        lte: (length) => [
            `length<=${length}`,
            data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
        ],
        neq: (length) => [
            `length<>${length}`,
            data => data.length !== length ? null : `Length should not be equal to ${length}.`,
        ],
    } });
/**
 * {@inheritdoc}
 */
$String.processor = Object.assign(Object.assign({}, Data.Handler.processor), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
