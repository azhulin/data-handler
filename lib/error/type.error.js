"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
const error_1 = require("../error");
/**
 * The data type error.
 */
class ErrorType extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorType object.
     *
     * @param handler - The data handler instance.
     */
    constructor(handler) {
        super(`Value has invalid type. ${handler.typeName} expected.`, handler.path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.type`;
        this.details = Object.assign(Object.assign({}, this.details), { type: handler.type, id: this.id(handler) });
    }
}
exports.ErrorType = ErrorType;
