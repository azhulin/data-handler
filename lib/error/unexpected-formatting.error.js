"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnexpectedFormatting = void 0;
const error_1 = require("../error");
/**
 * The data formatting unexpected error.
 */
class ErrorUnexpectedFormatting extends error_1.ErrorUnexpected {
    /**
     * Constructor for the ErrorUnexpectedFormatting object.
     */
    constructor(path, id, from, to, value) {
        super(`Invalid value type detected while formatting data.`, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.unexpected.formatting";
        this.details = Object.assign(Object.assign({}, this.details), { id, from, to, value });
    }
}
exports.ErrorUnexpectedFormatting = ErrorUnexpectedFormatting;
