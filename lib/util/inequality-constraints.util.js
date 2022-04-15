"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inequalityConstraints = void 0;
const component_1 = require("../component");
/**
 * Generates an inequality constraints.
 */
function inequalityConstraints(id, count, prefix, suffix) {
    suffix = suffix ? ` ${suffix}` : "";
    return {
        eq: (value) => new component_1.Constraint(`${id}=${value}`, data => count(data) === value ? null : `${prefix} should be equal to ${value}${suffix}.`),
        gt: (value) => new component_1.Constraint(`${id}>${value}`, data => count(data) > value ? null : `${prefix} should be greater than ${value}${suffix}.`),
        gte: (value) => new component_1.Constraint(`${id}>=${value}`, data => count(data) >= value ? null : `${prefix} should be greater than or equal to ${value}${suffix}.`),
        lt: (value) => new component_1.Constraint(`${id}<${value}`, data => count(data) < value ? null : `${prefix} should be lesser than ${value}${suffix}.`),
        lte: (value) => new component_1.Constraint(`${id}<=${value}`, data => count(data) <= value ? null : `${prefix} should be lesser than or equal to ${value}${suffix}.`),
        neq: (value) => new component_1.Constraint(`${id}<>${value}`, data => count(data) !== value ? null : `${prefix} should not be equal to ${value}${suffix}.`),
    };
}
exports.inequalityConstraints = inequalityConstraints;
