"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Number = void 0;
const Data = require("..");
/**
 * The number data handler class.
 */
class NumberHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * The number of decimal points.
         */
        this.decimals = null;
        const config = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        this.decimals = (_b = config.decimals) !== null && _b !== void 0 ? _b : this.decimals;
        if (null !== this.decimals && !Data.isIndex(this.decimals)) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "number"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Number"; }
    /**
     * {@inheritdoc}
     */
    get description() {
        switch (this.decimals) {
            case null:
                return "";
            case 1:
                return "1 decimal place";
            default:
                return `${this.decimals} decimal places`;
        }
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "number" === typeof data && isFinite(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const original = data;
        data = null !== this.decimals ? +data.toFixed(this.decimals) : data;
        original !== data
            && this.warn(new Data.ErrorAdapted(this.path, original, data));
        return super.inputToBase(data, context);
    }
}
/**
 * {@inheritdoc}
 */
NumberHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { eq: (value) => new Data.Constraint(`=${value}`, data => data === value ? null : `Value should be equal to ${value}.`), gt: (value) => new Data.Constraint(`>${value}`, data => data > value ? null : `Value should be greater than ${value}.`), gte: (value) => new Data.Constraint(`>=${value}`, data => data >= value ? null : `Value should be greater than or equal to ${value}.`), lt: (value) => new Data.Constraint(`<${value}`, data => data < value ? null : `Value should be lesser than ${value}.`), lte: (value) => new Data.Constraint(`<=${value}`, data => data <= value ? null : `Value should be lesser than or equal to ${value}.`), neq: (value) => new Data.Constraint(`<>${value}`, data => data !== value ? null : `Value should not be equal to ${value}.`) });
var $Number;
(function ($Number) {
    $Number.Handler = NumberHandler;
    $Number.constraint = $Number.Handler.constraint;
    $Number.preparer = $Number.Handler.preparer;
    $Number.processor = $Number.Handler.processor;
    function conf(config = {}) { return { Handler: $Number.Handler, config }; }
    $Number.conf = conf;
    function init(config = {}) { return new $Number.Handler({ config }); }
    $Number.init = init;
})($Number = exports.$Number || (exports.$Number = {}));
