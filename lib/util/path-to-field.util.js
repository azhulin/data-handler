"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToField = void 0;
/**
 * Converts a data path to a string.
 */
function pathToField(path) {
    return path.map(item => "string" === typeof item ? `.${item}` : `[${item}]`).join("");
}
exports.pathToField = pathToField;
