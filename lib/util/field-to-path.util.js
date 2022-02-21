"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldToPath = void 0;
const error_1 = require("../error");
/**
 * Converts a string to a data path.
 */
function fieldToPath(field) {
    if (!field) {
        return [];
    }
    if (!field.match(/^((\.[0-9a-z_]+)|(\[[0-9]+\]))+$/i)) {
        throw new error_1.ErrorUnexpected(`Unable to convert field to path, because specified field '${field}' is invalid.`);
    }
    return field.split(/(\.[^.\[]+|\[[^\]]+\])/).filter(item => item)
        .map(item => "." === item[0] ? item.substring(1) : +item.substring(1, 1));
}
exports.fieldToPath = fieldToPath;
