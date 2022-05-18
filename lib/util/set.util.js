"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
/**
 * Sets the specified value under the specified data path in the provided data.
 *
 * @param data - The data to set value for.
 * @param path - The data path to set the value under.
 * @param value - The value to set.
 *
 * @returns Provided data with the specified value set.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if the specified data path does not exist in provided data.
 */
function set(data, [...path], value) {
    if (!path.length) {
        return value;
    }
    const lastKey = path.pop();
    let subData = data;
    const error = () => {
        throw new error_1.ErrorUnexpected("Can not set the value, because the specified data path does not exist in provided data.");
    };
    for (const key of path) {
        util_1.isValidKey(key, subData, true) || error();
        subData = subData[key];
    }
    util_1.isValidKey(lastKey, subData, false) || error();
    undefined === value ? delete subData[lastKey] : subData[lastKey] = value;
    return data;
}
exports.set = set;
