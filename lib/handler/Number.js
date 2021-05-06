"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The number data handler class.
 */
class NumberHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.id = "number";
        /**
         * {@inheritdoc}
         */
        this.name = "Number";
        /**
         * Whether the number can be negative.
         */
        this.negative = true;
        /**
         * Whether the number can be zero.
         */
        this.zero = true;
        /**
         * Whether the number can be positive.
         */
        this.positive = true;
        /**
         * The number of decimal points.
         */
        this.decimals = null;
        const config = settings.config;
        const map = { negative: "-", zero: "0", positive: "+" };
        Object.entries(map).forEach(([prop, flag]) => { var _a; return this[prop] = ((_a = config.span) !== null && _a !== void 0 ? _a : "-0+").includes(flag); });
        if (Object.keys(map).every(property => !(this[property]))) {
            throw new Data.Error.Unexpected(`${this.name} configuration is invalid. Invalid 'span' property.`);
        }
        this.decimals = (_a = config.decimals) !== null && _a !== void 0 ? _a : this.decimals;
        if (null !== this.decimals && !Data.Util.isIndex(this.decimals)) {
            throw new Data.Error.Unexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get description() {
        const prefix = this.getSpanPrefix();
        const parts = prefix ? [prefix] : [];
        switch (this.decimals) {
            case null:
                break;
            case 0:
                parts.push("integer");
                break;
            case 1:
                parts.push("1 decimal place");
                break;
            default:
                parts.push(`${this.decimals} decimal places`);
                break;
        }
        return parts.join(" ");
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "number" === typeof data && isFinite(data)
            && (0 !== this.decimals || Number.isInteger(data))
            && (0 < data && this.positive
                || 0 === data && this.zero
                || 0 > data && this.negative);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const original = data;
        data = null !== this.decimals ? +data.toFixed(this.decimals) : data;
        original !== data
            && this.warn(new Data.Error.Adapted(this.path, original, data));
        return super.inputToBase(data, context);
    }
    /**
     * {@inheritdoc}
     */
    async checkConstraint(constraint, data, context) {
        const matches = constraint.match(/^([><]?=?)(\d+)$/);
        if (matches && matches[1]) {
            const value = +matches[2];
            switch (matches[1]) {
                case "=":
                    return data === value
                        ? null
                        : `Value should be equal to ${value}.`;
                case ">":
                    return data > value
                        ? null
                        : `Value should be greater than ${value}.`;
                case ">=":
                    return data >= value
                        ? null
                        : `Value should be greater than or equal to ${value}.`;
                case "<":
                    return data < value
                        ? null
                        : `Value should be lesser than ${value}.`;
                case "<=":
                    return data <= value
                        ? null
                        : `Value should be lesser than or equal to ${value}.`;
            }
        }
        return super.checkConstraint(constraint, data, context);
    }
    /**
     * Return number type span prefix.
     */
    getSpanPrefix() {
        const span = (this.negative ? "-" : "")
            + (this.zero ? "0" : "") + (this.positive ? "+" : "");
        switch (span) {
            case "-":
                return "negative";
            case "0":
                return "zero";
            case "-0":
                return "not positive";
            case "+":
                return "positive";
            case "-+":
                return "not zero";
            case "0+":
                return "not negative";
            default:
                return "";
        }
    }
}
exports.default = NumberHandler;
exports.Handler = NumberHandler;
