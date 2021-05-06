"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_validator_1 = require("@azhulin/data-validator");
/**
 * The data formatting unexpected error.
 */
class ErrorDataUnexpectedFormatting extends data_validator_1.Error.Unexpected {
    /**
     * Constructor for the ErrorDataInternalFormat object.
     */
    constructor(path, id, from, to, value) {
        super(`Invalid value type detected while formatting data.`, path);
        /**
         * {@inheritdoc}
         */
        this.type = "data.unexpected.formatting";
        this.details = Object.assign(Object.assign({}, this.details), { id, from, to, value });
    }
}
exports.default = ErrorDataUnexpectedFormatting;
