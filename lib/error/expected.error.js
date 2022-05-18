"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorExpected = void 0;
const error_1 = require("../error");
/**
 * The expected data error.
 *
 * Error related to the data validation itself. For example, invalid data type.
 */
class ErrorExpected extends error_1.ErrorData {
}
exports.ErrorExpected = ErrorExpected;
