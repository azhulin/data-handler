"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmpty = void 0;
const error_1 = require("../error");
/**
 * The data empty error.
 */
class ErrorEmpty extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorEmpty object.
     *
     * @param handler - The data handler instance.
     */
    constructor(handler) {
        super(`Value must not be empty. ${ErrorEmpty.type(handler)} expected.`, handler.path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.empty`;
        this.details = Object.assign(Object.assign({}, this.details), { id: handler.id, type: handler.type });
    }
}
exports.ErrorEmpty = ErrorEmpty;
