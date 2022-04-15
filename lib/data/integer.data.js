"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Integer = void 0;
const _1 = require(".");
/**
 * The integer data handler class.
 */
class IntegerHandler extends _1.$Number.Handler {
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
var $Integer;
(function ($Integer) {
    $Integer.Handler = IntegerHandler;
    $Integer.constraint = $Integer.Handler.constraint;
    $Integer.preparer = $Integer.Handler.preparer;
    $Integer.processor = $Integer.Handler.processor;
    function conf(config = {}) { return { Handler: $Integer.Handler, config }; }
    $Integer.conf = conf;
    function init(config = {}) { return new $Integer.Handler(config); }
    $Integer.init = init;
})($Integer = exports.$Integer || (exports.$Integer = {}));
