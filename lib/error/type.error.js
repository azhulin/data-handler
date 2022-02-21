"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
const _1 = require(".");
/**
 * The data type error.
 */
class ErrorType extends _1.ErrorExpected {
    /**
     * Constructor for the ErrorType object.
     */
    constructor(path, { id, name, description }) {
        super("", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.type";
        const type = description ? `${name} (${description})` : name;
        this.message = `Value has invalid type. ${type} expected.`;
        this.details = Object.assign(Object.assign({}, this.details), { type: id });
    }
}
exports.ErrorType = ErrorType;
