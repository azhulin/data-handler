"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$String = void 0;
const Data = require("..");
/**
 * The string data handler class.
 */
class StringHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get type() { return "string"; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return "String"; }
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
StringHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { length: Data.inequalityConstraints("length", data => data.length, "Length"), trimmed: ["trimmed", data => data === data.trim() ? null : "Value must be trimmed.",
    ] });
/**
 * {@inheritdoc}
 */
StringHandler.processor = Object.assign(Object.assign({}, Data.Handler.processor), { trim: (data) => data.trim(), lower: (data) => data.toLowerCase(), upper: (data) => data.toUpperCase() });
/**
 * The string data handler namespace.
 */
var $String;
(function ($String) {
    $String.Handler = StringHandler;
    $String.constraint = $String.Handler.constraint;
    $String.preparer = $String.Handler.preparer;
    $String.processor = $String.Handler.processor;
    function conf(config = {}) { return { Handler: $String.Handler, config }; }
    $String.conf = conf;
    function init(config = {}) { return new $String.Handler(config); }
    $String.init = init;
})($String = exports.$String || (exports.$String = {}));
