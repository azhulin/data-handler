"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Number = void 0;
const Data = require("..");
/**
 * The number data handler class.
 */
class $ extends Data.Handler {
    /**
     * {@inheritdoc}
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `decimals` data handler property is invalid.
     */
    constructor(config, settings) {
        var _a;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.name = "Number";
        /**
         * {@inheritdoc}
         */
        this.type = $.id;
        /**
         * {@inheritdoc}
         */
        this.typeName = this.name;
        /**
         * The number of decimal places.
         */
        this.decimals = null;
        this.decimals = (_a = config.decimals) !== null && _a !== void 0 ? _a : this.decimals;
        if (null !== this.decimals && !Data.isIndex(this.decimals)) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Invalid 'decimals' property.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    isValidType(data) {
        return "number" === typeof data && isFinite(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        data = await super.inputToBase(data, context);
        return null !== this.decimals ? +data.toFixed(this.decimals) : data;
    }
}
/**
 * {@inheritdoc}
 */
$.id = "number";
/**
 * {@inheritdoc}
 */
$.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), Data.inequalityConstraints(`${$.id}:`, data => data, "Value"));
/**
 * The number data handler namespace.
 */
var $Number;
(function ($Number) {
    $Number.Handler = $;
    $Number.id = $.id, $Number.constraint = $.constraint, $Number.preparer = $.preparer, $Number.processor = $.processor;
    function conf(config = {}) { return $.conf($, config); }
    $Number.conf = conf;
    function init(config = {}) { return $.init($, config); }
    $Number.init = init;
})($Number = exports.$Number || (exports.$Number = {}));
