"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_validator_1 = require("@azhulin/data-validator");
const ErrorDataInternalFormat_1 = require("./error/ErrorDataInternalFormat");
exports.default = Object.assign(Object.assign({}, data_validator_1.Error), { InternalFormat: ErrorDataInternalFormat_1.default });
