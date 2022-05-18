"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResolve = void 0;
const error_1 = require("../error");
const util_1 = require("../util");
/**
 * Returns the resolved data path after applying the specified relative data
 * field.
 *
 * @param path - The data path to resolve.
 * @param field - The relative data field to apply to the data path.
 *
 * @returns A resolved data path.
 *
 * @throws {@link ErrorUnexpected}
 * Thrown if the data path can not be resolved.
 */
function pathResolve(path, field = "") {
    var _a;
    const [prefix, level] = (_a = field.match(/^\^([0-9]+)?/)) !== null && _a !== void 0 ? _a : ["", "0"];
    const levelsUp = +(level !== null && level !== void 0 ? level : 1);
    if (levelsUp > path.length) {
        throw new error_1.ErrorUnexpected("Unable to resolve the data path.");
    }
    return [
        ...path.slice(0, levelsUp ? -levelsUp : undefined),
        ...util_1.fieldToPath(field.replace(prefix, "")),
    ];
}
exports.pathResolve = pathResolve;
