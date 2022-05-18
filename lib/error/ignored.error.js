"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorIgnored = void 0;
const error_1 = require("../error");
/**
 * The data ignored error.
 *
 * This error can be used to generate a warning when the redundant data is
 * provided in the input. For example, when provided an object with a key that
 * is not described in the data schema.
 */
class ErrorIgnored extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorIgnored object.
     *
     * @param path - The path of the data in the data tree.
     */
    constructor(path) {
        super("Value is ignored.", path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.ignored`;
    }
    /**
     * {@inheritdoc}
     */
    toString() {
        const field = this.field();
        return field ? `Value of the field ${field} is ignored.` : this.message;
    }
}
exports.ErrorIgnored = ErrorIgnored;
