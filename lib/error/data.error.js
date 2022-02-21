"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorData = void 0;
/**
 * The base data error.
 */
class ErrorData extends Error {
    /**
     * Constructor for the ErrorData object.
     */
    constructor(message, path = []) {
        super(message);
        /**
         * The error type.
         */
        this.type = "data";
        /**
         * The error details.
         */
        this.details = {};
        this.path = path;
        const field = this.getField() || undefined;
        this.details = Object.assign(Object.assign({}, this.details), { field });
    }
    /**
     * Returns the path of the data in the data tree as a string.
     */
    getField(path) {
        return (path !== null && path !== void 0 ? path : this.path).map(item => "string" === typeof item ? `.${item}` : `[${item}]`).join("");
    }
}
exports.ErrorData = ErrorData;
