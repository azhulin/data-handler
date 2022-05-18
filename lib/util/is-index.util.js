"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndex = void 0;
/**
 * Determines whether the provided value is a valid array index.
 *
 * @param value - The value to check.
 *
 * @returns `true`, if the providedd value is a valid array index, and `false`
 *   otherwise.
 */
function isIndex(value) {
    return Number.isInteger(value) && 0 <= value;
}
exports.isIndex = isIndex;
