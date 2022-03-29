"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$String = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class StringHandler extends Data.Handler {
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
}
/**
 * {@inheritdoc}
 */
StringHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { trimmed: new Data.Constraint("trimmed", data => data === data.trim() ? null : "Value should be trimmed."), length: {
        eq: (length) => new Data.Constraint(`length=${length}`, data => data.length === length ? null : `Length should be equal to ${length}.`),
        gt: (length) => new Data.Constraint(`length>${length}`, data => data.length > length ? null : `Length should be greater than ${length}.`),
        gte: (length) => new Data.Constraint(`length>=${length}`, data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`),
        lt: (length) => new Data.Constraint(`length<${length}`, data => data.length < length ? null : `Length should be lesser than ${length}.`),
        lte: (length) => new Data.Constraint(`length<=${length}`, data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`),
        neq: (length) => new Data.Constraint(`length<>${length}`, data => data.length !== length ? null : `Length should not be equal to ${length}.`),
    } });
/**
 * {@inheritdoc}
 */
StringHandler.processor = Object.assign(Object.assign({}, Data.Handler.processor), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
var $String;
(function ($String) {
    $String.Handler = StringHandler;
    $String.constraint = $String.Handler.constraint;
    $String.preparer = $String.Handler.preparer;
    $String.processor = $String.Handler.processor;
    function conf(config = {}) { return { Handler: $String.Handler, config }; }
    $String.conf = conf;
    function init(config = {}) { return new $String.Handler({ config }); }
    $String.init = init;
})($String = exports.$String || (exports.$String = {}));
