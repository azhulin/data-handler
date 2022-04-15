"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorIgnored = void 0;
const error_1 = require("../error");
/**
 * The data ignored error.
 */
class ErrorIgnored extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorIgnored object.
     */
    constructor(path) {
        super("Value is ignored.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.ignored";
    }
    /**
     * {@inheritdoc}
     */
    toString() {
        return `Value of the field ${this.getField()} is ignored.`;
    }
}
exports.ErrorIgnored = ErrorIgnored;
