"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Timestamp = void 0;
const Data = require("..");
/**
 * The timestamp data handler class.
 */
class $ extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.name = "Timestamp";
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
        return Data.isIndex(data);
    }
}
/**
 * {@inheritdoc}
 */
$.id = "timestamp";
/**
 * {@inheritdoc}
 */
$.constraint = Object.assign(Object.assign(Object.assign({}, Data.Handler.constraint), Data.inequalityConstraints(`${$.id}:`, data => data, "Value")), { future: [
        `${$.id}:future`,
        data => data > Date.now() ? null : "Future date expected.",
    ], past: [
        `${$.id}:past`,
        data => data < Date.now() ? null : "Past date expected.",
    ] });
/**
 * The timestamp data handler namespace.
 */
var $Timestamp;
(function ($Timestamp) {
    $Timestamp.Handler = $;
    $Timestamp.id = $.id, $Timestamp.constraint = $.constraint, $Timestamp.preparer = $.preparer, $Timestamp.processor = $.processor;
    function conf(config = {}) { return $.conf($, config); }
    $Timestamp.conf = conf;
    function init(config = {}) { return $.init($, config); }
    $Timestamp.init = init;
})($Timestamp = exports.$Timestamp || (exports.$Timestamp = {}));
