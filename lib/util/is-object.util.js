"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
/**
 * Determines whether the provided value is a simple object.
 *
 * @param value - The value to check.
 *
 * @returns `true`, if the provided value is a simple object, and `false`
 *   otherwise.
 */
function isObject(value) {
    return "object" === typeof value && null !== value && Object === value.constructor;
}
exports.isObject = isObject;
