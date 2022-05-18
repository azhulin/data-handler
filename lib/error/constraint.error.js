"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorConstraint = void 0;
const error_1 = require("../error");
/**
 * The data constraint error.
 */
class ErrorConstraint extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorConstraint object.
     *
     * @param handler - The data handler instance.
     * @param constraint - The data constraint ID.
     * @param message - The error message.
     * @param details - The error details.
     */
    constructor(handler, constraint, message, details) {
        super(message, handler.path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.constraint`;
        const { id, type } = handler;
        this.details = Object.assign(Object.assign(Object.assign({}, this.details), { id, type, constraint }), details);
    }
}
exports.ErrorConstraint = ErrorConstraint;
