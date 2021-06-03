"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The timestamp data handler class.
 */
class Handler extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { ">now": (data) => data > +new Date() ? null : "Future date expected.", "<now": (data) => data < +new Date() ? null : "Past date expected." });
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "number.timestamp"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Timestamp"; }
    /**
     * {@inheritdoc}
     */
    get description() { return `e.g. ${+new Date()}`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.isIndex(data);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
