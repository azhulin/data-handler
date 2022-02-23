"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constraint = void 0;
/**
 * Constraint component.
 */
class Constraint {
    /**
     * Constructor for the Constraint object.
     */
    constructor(id, func, skip = false) {
        this.id = id;
        this.func = func;
        this.skip = skip;
    }
    /**
     * Sets skip on update flag.
     */
    skipOnUpdate(skip = true) {
        return new Constraint(this.id, this.func, skip);
    }
}
exports.Constraint = Constraint;
