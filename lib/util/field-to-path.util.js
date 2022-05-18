"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldToPath = void 0;
const error_1 = require("../error");
/**
 * Converts a data field to a data path.
 *
 * @param field - The data field to convert to a data path.
 *
 * @returns A data path.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if an invalid data field is provided.
 */
function fieldToPath(field) {
    if (!field.match(/^((\.[0-9a-z_]+)|(\[[0-9]+\]))*$/i)) {
        throw new error_1.ErrorUnexpected(`Invalid data field: ${field}.`);
    }
    return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
        .map(item => "." === item[0] ? item.substring(1) : +item.substring(1, 1));
}
exports.fieldToPath = fieldToPath;
