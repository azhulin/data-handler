"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$NumberOptionList = void 0;
const _1 = require(".");
/**
 * The number option list data handler class.
 */
class NumberOptionListHandler extends _1.$List.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(config, settings) {
        var _a, _b;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            _1.$List.constraint.unique,
        ];
        /**
         * {@inheritdoc}
         */
        this.postprocessors = [
            data => {
                if (this.preserve_order) {
                    return data;
                }
                const keys = _1.$NumberOption.Handler.optionKeys(this.options);
                return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
            }
        ];
        /**
         * The options.
         */
        this.options = [];
        /**
         * Whether to preserve the original order of option items.
         */
        this.preserve_order = false;
        this.options = (_a = config.options) !== null && _a !== void 0 ? _a : this.options;
        this.preserve_order = (_b = config.preserve_order) !== null && _b !== void 0 ? _b : this.preserve_order;
        this.item = _1.$NumberOption.conf({
            options: this.options,
        });
    }
}
/**
 * The number option list data handler namespace.
 */
var $NumberOptionList;
(function ($NumberOptionList) {
    $NumberOptionList.Handler = NumberOptionListHandler;
    $NumberOptionList.constraint = $NumberOptionList.Handler.constraint;
    $NumberOptionList.preparer = $NumberOptionList.Handler.preparer;
    $NumberOptionList.processor = $NumberOptionList.Handler.processor;
    function conf(config) { return { Handler: $NumberOptionList.Handler, config }; }
    $NumberOptionList.conf = conf;
    function init(config) { return new $NumberOptionList.Handler(config); }
    $NumberOptionList.init = init;
})($NumberOptionList = exports.$NumberOptionList || (exports.$NumberOptionList = {}));
