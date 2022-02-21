"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const _1 = require(".");
const error_1 = require("../error");
/**
 * Sets data value by path.
 */
function set(data, path, item) {
    if (!path.length) {
        return item;
    }
    path = [...path];
    const last = path.pop();
    let value = data;
    for (const key of path) {
        if ("string" === typeof key && !_1.isObject(value)
            || _1.isIndex(key) && !Array.isArray(value)
            || !(key in value)) {
            throw new error_1.ErrorUnexpected("Can not set data, because specified path does not exist.");
        }
        value = value[key];
    }
    if ("string" === typeof last && !_1.isObject(value)
        || _1.isIndex(last) && !Array.isArray(value)) {
        throw new error_1.ErrorUnexpected("Can not set data, because value at specified path is invalid.");
    }
    undefined === item ? delete value[last] : value[last] = item;
    return data;
}
exports.set = set;
