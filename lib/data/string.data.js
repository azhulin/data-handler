"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$String = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class $ extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.name = "String";
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
        return "string" === typeof data;
    }
}
/**
 * {@inheritdoc}
 */
$.id = "string";
/**
 * {@inheritdoc}
 */
$.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { length: Data.inequalityConstraints(`${$.id}:length`, data => data.length, "Length"), trimmed: [
        `${$.id}:trimmed`,
        data => data === data.trim() ? null : "Value must be trimmed.",
    ] });
/**
 * {@inheritdoc}
 */
$.processor = Object.assign(Object.assign({}, Data.Handler.processor), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
/**
 * The string data handler namespace.
 */
var $String;
(function ($String) {
    $String.Handler = $;
    $String.id = $.id, $String.constraint = $.constraint, $String.preparer = $.preparer, $String.processor = $.processor;
    function conf(config = {}) { return $.conf($, config); }
    $String.conf = conf;
    function init(config = {}) { return $.init($, config); }
    $String.init = init;
})($String = exports.$String || (exports.$String = {}));
