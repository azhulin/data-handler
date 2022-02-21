"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
/**
 * Determines whether the value is an object.
 */
function isObject(value) {
    return "object" === typeof value && null !== value && Object === value.constructor;
}
exports.isObject = isObject;
