"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAdapted = void 0;
const error_1 = require("../error");
/**
 * The data adapted error.
 */
class ErrorAdapted extends error_1.ErrorExpected {
    /**
     * Constructor for the ErrorAdapted object.
     */
    constructor(path, original, adapted) {
        super(`Value was adapted from ${JSON.stringify(original)} to ${JSON.stringify(adapted)}.`, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.adapted";
        this.details = Object.assign(Object.assign({}, this.details), { original, adapted });
    }
    /**
     * {@inheritdoc}
     */
    toString() {
        let { original, adapted } = this.details;
        original = JSON.stringify(original);
        adapted = JSON.stringify(adapted);
        return `Value of field ${this.getField()} was adapted from ${original} to ${adapted}.`;
    }
}
exports.ErrorAdapted = ErrorAdapted;
