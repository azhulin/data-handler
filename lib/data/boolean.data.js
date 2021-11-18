"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class Handler extends Data.Handler {
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
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
