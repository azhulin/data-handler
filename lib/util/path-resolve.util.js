"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResolve = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
/**
 * Returns the modified path.
 */
function pathResolve(path, field = "") {
    var _a;
    if ("*" === field) {
        return [];
    }
    const regexp = /^\^([0-9]+)?/;
    const match = field.match(regexp);
    const up = match ? +((_a = match[1]) !== null && _a !== void 0 ? _a : 1) : 0;
    field = field.replace(regexp, "");
    if (up > path.length) {
        throw new error_1.ErrorUnexpected("Unable to resolve the path, because specified offset is out of bounds.");
    }
    return [
        ...path.slice(0, up ? -up : undefined),
        ...util_1.fieldToPath(field),
    ];
}
exports.pathResolve = pathResolve;
