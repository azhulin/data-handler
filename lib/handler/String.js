"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class String extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.id = "string";
        /**
         * {@inheritdoc}
         */
        this.name = "String";
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { trimmed: (data) => data === data.trim() ? null : "Value should be trimmed." });
        /**
         * {@inheritdoc}
         */
        this.processorLibrary = Object.assign(Object.assign({}, this.processorLibrary), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
    }
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
            && this.warn(new Data.Error.Adapted(this.path, original, data));
        return data;
    }
    /**
     * {@inheritdoc}
     */
    async checkConstraint(constraint, data, context) {
        const matches = constraint.match(/^length([><]?=?)(\d+)$/);
        if (matches && matches[1]) {
            const length = +matches[2];
            switch (matches[1]) {
                case "=":
                    return data.length === length
                        ? null
                        : `Length should be equal to ${length}.`;
                case ">":
                    return data.length > length
                        ? null
                        : `Length should be greater than ${length}.`;
                case ">=":
                    return data.length >= length
                        ? null
                        : `Length should be greater than or equal to ${length}.`;
                case "<":
                    return data.length < length
                        ? null
                        : `Length should be lesser than ${length}.`;
                case "<=":
                    return data.length <= length
                        ? null
                        : `Length should be lesser than or equal to ${length}.`;
            }
        }
        return super.checkConstraint(constraint, data, context);
    }
}
exports.default = String;
exports.Handler = String;
