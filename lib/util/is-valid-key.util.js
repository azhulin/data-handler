"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidKey = void 0;
const util_1 = require("../util");
/**
 * Checks whether the specified key is valid for the provided data.
 *
 * @param key - The key to check.
 * @param data - The data to check the key for.
 * @param exists - Whether to check key existence.
 *
 * @returns `true`, if the specified key is valid for the provided data, and
 *   `false` otherwise.
 */
function isValidKey(key, data, exists) {
    return ("string" === typeof key && util_1.isObject(data)
        || util_1.isIndex(key) && Array.isArray(data)) && (exists ? key in data : true);
}
exports.isValidKey = isValidKey;
