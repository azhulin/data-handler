"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const util_1 = require("../util");
/**
 * Extracts a value from the provided data by the specified data path.
 *
 * @param data - The data to extract the value from.
 * @param path - The data path to extract the value by.
 * @param fallback - A fallback value to return, if the specified data path
 *   does not exist in the provided data.
 *
 * @returns An extracted value, if the specified data path exists, and a
 *   fallback value otherwise.
 */
function extract(data, path, fallback = undefined) {
    let value = data;
    for (const key of path) {
        if (!util_1.isValidKey(key, value, true)) {
            return fallback;
        }
        value = value[key];
    }
    return value;
}
exports.extract = extract;
