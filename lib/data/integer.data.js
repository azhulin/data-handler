"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Integer = void 0;
const Data = require("..");
/**
 * The integer data handler class.
 */
class IntegerHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get type() { return "integer"; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return "Integer"; }
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
IntegerHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), Data.inequalityConstraints("", data => data, "Value"));
/**
 * The integer data handler namespace.
 */
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
