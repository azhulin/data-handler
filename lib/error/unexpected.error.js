"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnexpected = void 0;
const error_1 = require("../error");
/**
 * The unexpected data error.
 *
 * Error not related to the data validation itself. For example, invalid data
 * handler configuration.
 */
class ErrorUnexpected extends error_1.ErrorData {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.unexpected`;
    }
}
exports.ErrorUnexpected = ErrorUnexpected;
