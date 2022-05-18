"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class BooleanHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get type() { return "boolean"; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return "Boolean"; }
    /**
     * {@inheritdoc}
     */
    isValidType(data) {
        return "boolean" === typeof data;
    }
}
/**
 * The boolean data handler namespace.
 */
var $Boolean;
(function ($Boolean) {
    $Boolean.Handler = BooleanHandler;
    $Boolean.constraint = $Boolean.Handler.constraint;
    $Boolean.preparer = $Boolean.Handler.preparer;
    $Boolean.processor = $Boolean.Handler.processor;
    function conf(config = {}) { return { Handler: $Boolean.Handler, config }; }
    $Boolean.conf = conf;
    function init(config = {}) { return new $Boolean.Handler(config); }
    $Boolean.init = init;
})($Boolean = exports.$Boolean || (exports.$Boolean = {}));
