"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class $ extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.name = "Boolean";
        /**
         * {@inheritdoc}
         */
        this.type = $.id;
        /**
         * {@inheritdoc}
         */
        this.typeName = this.name;
    }
    /**
     * {@inheritdoc}
     */
    isValidType(data) {
        return "boolean" === typeof data;
    }
}
/**
 * {@inheritdoc}
 */
$.id = "boolean";
/**
 * The boolean data handler namespace.
 */
var $Boolean;
(function ($Boolean) {
    $Boolean.Handler = $;
    $Boolean.id = $.id, $Boolean.constraint = $.constraint, $Boolean.preparer = $.preparer, $Boolean.processor = $.processor;
    function conf(config = {}) { return $.conf($, config); }
    $Boolean.conf = conf;
    function init(config = {}) { return $.init($, config); }
    $Boolean.init = init;
})($Boolean = exports.$Boolean || (exports.$Boolean = {}));
