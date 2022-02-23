"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Timestamp = void 0;
const Data = require("..");
const _1 = require(".");
/**
 * The timestamp data handler class.
 */
class TimestampHandler extends _1.$Number.Handler {
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
    get id() { return super.id + ".timestamp"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Timestamp"; }
    /**
     * {@inheritdoc}
     */
    get description() { return `e.g. ${Date.now()}`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.isIndex(data);
    }
}
/**
 * {@inheritdoc}
 */
TimestampHandler.constraint = Object.assign(Object.assign({}, _1.$Number.constraint), { future: new Data.Constraint(">now", data => data > Date.now() ? null : "Future date expected."), past: new Data.Constraint("<now", data => data < Date.now() ? null : "Past date expected.") });
var $Timestamp;
(function ($Timestamp) {
    $Timestamp.Handler = TimestampHandler;
    $Timestamp.constraint = $Timestamp.Handler.constraint;
    $Timestamp.preparer = $Timestamp.Handler.preparer;
    $Timestamp.processor = $Timestamp.Handler.processor;
    function conf(config = {}) { return { Handler: $Timestamp.Handler, config }; }
    $Timestamp.conf = conf;
    function init(config = {}) { return new $Timestamp.Handler({ config }); }
    $Timestamp.init = init;
})($Timestamp = exports.$Timestamp || (exports.$Timestamp = {}));
