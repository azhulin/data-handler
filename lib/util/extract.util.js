"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const _1 = require(".");
/**
 * Extracts a value from data by path.
 */
function extract(data, path, fallback = undefined) {
    let value = data;
    for (const key of path) {
        if ("string" === typeof key && !_1.isObject(value)
            || _1.isIndex(key) && !Array.isArray(value)
            || !(key in value)) {
            return fallback;
        }
        value = value[key];
    }
    return value;
}
exports.extract = extract;
