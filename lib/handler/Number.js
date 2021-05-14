"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The number data handler class.
 */
class Handler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
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
         * The number of decimal points.
         */
        this.decimals = null;
        const config = (_a = settings.config) !== null && _a !== void 0 ? _a : {};
        this.decimals = (_b = config.decimals) !== null && _b !== void 0 ? _b : this.decimals;
        if (null !== this.decimals && !Data.Util.isIndex(this.decimals)) {
            throw new Data.Error.Unexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get description() {
        switch (this.decimals) {
            case null:
                return;
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
        return Data.Util.isNumber(data);
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
        const matches = constraint.match(/^(=|>|>=|<|<=|<>)(\d+)$/);
        if (matches) {
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
                case "<>":
                    return data !== value
                        ? null
                        : `Value should not be equal to ${value}.`;
            }
        }
        return super.checkConstraint(constraint, data, context);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign({ Handler }, config); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
