"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class Boolean extends Data.Handler {
    constructor() {
        var _a;
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.id = "boolean";
        /**
         * {@inheritdoc}
         */
        this.name = "Boolean";
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: (_a = this.default.value) !== null && _a !== void 0 ? _a : false });
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "boolean" === typeof data;
    }
}
exports.default = Boolean;
exports.Handler = Boolean;
