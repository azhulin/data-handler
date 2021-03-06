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
     *
     * @param handler - The data handler instance.
     */
    constructor(handler) {
        super(`Value is required. ${handler.typeName} expected.`, handler.path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.required`;
        this.details = Object.assign(Object.assign({}, this.details), { type: handler.type, id: this.id(handler) });
    }
}
exports.ErrorRequired = ErrorRequired;
