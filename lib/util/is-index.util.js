"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndex = void 0;
/**
 * Determines whether the value is an index.
 */
function isIndex(value) {
    return Number.isInteger(value) && 0 <= value;
}
exports.isIndex = isIndex;
