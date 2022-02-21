"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRequired = void 0;
const _1 = require(".");
/**
 * The data required error.
 */
class ErrorRequired extends _1.ErrorExpected {
    /**
     * Constructor for the ErrorRequired object.
     */
    constructor(path) {
        super("Value is required.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.required";
    }
}
exports.ErrorRequired = ErrorRequired;
