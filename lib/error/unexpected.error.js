"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnexpected = void 0;
const _1 = require(".");
/**
 * The unexpected data error.
 *
 * Errors not related to the data validation itself, e.g. checking a non-existing data constraint.
 */
class ErrorUnexpected extends _1.ErrorData {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.type = "data.unexpected";
    }
}
exports.ErrorUnexpected = ErrorUnexpected;
