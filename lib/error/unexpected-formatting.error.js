"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnexpectedFormatting = void 0;
const error_1 = require("../error");
/**
 * The data formatting unexpected error.
 *
 * This error is used when the data in a safe data format fails validation
 * before converting to another data format. Safe formats are `base` and `store`
 * as the data in these formats is assumed to be valid.
 */
class ErrorUnexpectedFormatting extends error_1.ErrorUnexpected {
    /**
     * Constructor for the ErrorUnexpectedFormatting object.
     *
     * @param handler - The data handler instance.
     * @param from - The data format the data was converted from.
     * @param to - The data format the data was converted to.
     * @param value - The data value.
     */
    constructor(handler, from, to, value) {
        super("Invalid value type detected while formatting data.", handler.path);
        /**
         * {@inheritdoc}
         */
        this.type = `${this.type}.formatting`;
        this.details = Object.assign(Object.assign({}, this.details), { id: handler.id, from, to, value });
    }
}
exports.ErrorUnexpectedFormatting = ErrorUnexpectedFormatting;
