"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const _1 = require(".");
/**
 * The integer data handler class.
 */
class Handler extends _1.$Number.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.decimals = 0;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".integer"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Integer"; }
    /**
     * {@inheritdoc}
     */
    get description() { return ""; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return super.isValid(data) && Number.isInteger(data);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
