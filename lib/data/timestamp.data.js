"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Timestamp = void 0;
const Data = require("..");
/**
 * The timestamp data handler class.
 */
class TimestampHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get type() { return "timestamp"; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return "Timestamp"; }
    /**
     * {@inheritdoc}
     */
    get typeDesc() { return `e.g. ${Date.now()}`; }
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
TimestampHandler.constraint = Object.assign(Object.assign(Object.assign({}, Data.Handler.constraint), Data.inequalityConstraints("", data => data, "Value")), { future: [">now", data => data > Date.now() ? null : "Future date expected.",
    ], past: ["<now", data => data < Date.now() ? null : "Past date expected.",
    ] });
/**
 * The timestamp data handler namespace.
 */
var $Timestamp;
(function ($Timestamp) {
    $Timestamp.Handler = TimestampHandler;
    $Timestamp.constraint = $Timestamp.Handler.constraint;
    $Timestamp.preparer = $Timestamp.Handler.preparer;
    $Timestamp.processor = $Timestamp.Handler.processor;
    function conf(config = {}) { return { Handler: $Timestamp.Handler, config }; }
    $Timestamp.conf = conf;
    function init(config = {}) { return new $Timestamp.Handler(config); }
    $Timestamp.init = init;
})($Timestamp = exports.$Timestamp || (exports.$Timestamp = {}));
