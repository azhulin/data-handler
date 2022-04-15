"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmpty = void 0;
const error_1 = require("../error");
/**
 * The data empty error.
 */
class ErrorEmpty extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorEmpty object.
     */
    constructor(path, { id, name, description }) {
        super("", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.empty";
        const type = description ? `${name} (${description})` : name;
        this.message = `Value should not be empty. ${type} expected.`;
        this.details = Object.assign(Object.assign({}, this.details), { type: id });
    }
}
exports.ErrorEmpty = ErrorEmpty;
