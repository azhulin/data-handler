"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmpty = void 0;
const _1 = require(".");
/**
 * The data empty error.
 */
class ErrorEmpty extends _1.ErrorExpected {
    /**
     * Constructor for the ErrorEmpty object.
     */
    constructor(path) {
        super("Value should not be empty.", path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.empty";
    }
}
exports.ErrorEmpty = ErrorEmpty;
