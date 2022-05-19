"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Integer = void 0;
const Data = require("..");
/**
 * The integer data handler class.
 */
class $ extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.name = "Integer";
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
        return Number.isInteger(data);
    }
}
/**
 * {@inheritdoc}
 */
$.id = "integer";
/**
 * {@inheritdoc}
 */
$.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), Data.inequalityConstraints(`${$.id}:`, data => data, "Value"));
/**
 * The integer data handler namespace.
 */
var $Integer;
(function ($Integer) {
    $Integer.Handler = $;
    $Integer.id = $.id, $Integer.constraint = $.constraint, $Integer.preparer = $.preparer, $Integer.processor = $.processor;
    function conf(config = {}) { return $.conf($, config); }
    $Integer.conf = conf;
    function init(config = {}) { return $.init($, config); }
    $Integer.init = init;
})($Integer = exports.$Integer || (exports.$Integer = {}));
