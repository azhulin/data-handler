"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class Handler extends Data.Handler {
    constructor() {
        var _a;
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: (_a = this.default.value) !== null && _a !== void 0 ? _a : false });
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "boolean"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Boolean"; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "boolean" === typeof data;
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign({ Handler }, config); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
