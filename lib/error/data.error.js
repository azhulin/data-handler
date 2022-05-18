"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorData = void 0;
const util_1 = require("../util");
/**
 * The base data error.
 */
class ErrorData extends Error {
    /**
     * Constructor for the ErrorData object.
     *
     * @param message - The error message.
     * @param path - The path of the data in the data tree.
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
        const field = this.field() || undefined;
        this.details = Object.assign(Object.assign({}, this.details), { field });
    }
    /**
     * Returns the data field from a data path.
     *
     * @param path - The data path to convert to a data field.
     *
     * @returns The data field.
     */
    field(path) {
        return util_1.pathToField(path !== null && path !== void 0 ? path : this.path);
    }
    /**
     * Returns the formatted handler data type.
     *
     * @param handler - The data handler instance.
     *
     * @returns Formatted data type.
     */
    static type(handler) {
        const { typeName, typeDesc } = handler;
        return typeDesc ? `${typeName} (${typeDesc})` : typeName;
    }
}
exports.ErrorData = ErrorData;
