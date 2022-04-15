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
     */
    constructor(message, path, type, constraint, details) {
        super(message, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.constraint";
        this.details = Object.assign(Object.assign(Object.assign({}, this.details), { type, constraint }), details);
    }
}
exports.ErrorConstraint = ErrorConstraint;
