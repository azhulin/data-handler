"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_validator_1 = require("@azhulin/data-validator");
/**
 * The data format internal error.
 */
class ErrorDataInternalFormat extends data_validator_1.Error.Internal {
    /**
     * Constructor for the ErrorDataInternalFormat object.
     */
    constructor(path, id, from, to, value) {
        super(`Invalid value type detected while formatting data.`, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.internal.format";
        this.details = Object.assign(Object.assign({}, this.details), { id, from, to, value });
    }
}
exports.default = ErrorDataInternalFormat;
