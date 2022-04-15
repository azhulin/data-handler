"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRequired = void 0;
const error_1 = require("../error");
/**
 * The data required error.
 */
class ErrorRequired extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorRequired object.
     */
    constructor(path, { id, name, description }) {
        super("", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.required";
        const type = description ? `${name} (${description})` : name;
        this.message = `Value is required. ${type} expected.`;
        this.details = Object.assign(Object.assign({}, this.details), { type: id });
    }
}
exports.ErrorRequired = ErrorRequired;
