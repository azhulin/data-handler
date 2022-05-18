"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToField = void 0;
/**
 * Converts a data path to a data field.
 *
 * @param path - The data path to convert to a data field.
 *
 * @returns A data field.
 */
function pathToField(path) {
    return path.map(item => "string" === typeof item ? `.${item}` : `[${item}]`).join("");
}
exports.pathToField = pathToField;
