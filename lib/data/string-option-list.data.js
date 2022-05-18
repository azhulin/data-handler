"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$StringOptionList = void 0;
const _1 = require(".");
/**
 * The string option list data handler class.
 */
class StringOptionListHandler extends _1.$List.Handler {
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
                const keys = _1.$StringOption.Handler.optionKeys(this.options);
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
        this.item = _1.$StringOption.conf({
            options: this.options,
        });
    }
}
/**
 * The string option list data handler namespace.
 */
var $StringOptionList;
(function ($StringOptionList) {
    $StringOptionList.Handler = StringOptionListHandler;
    $StringOptionList.constraint = $StringOptionList.Handler.constraint;
    $StringOptionList.preparer = $StringOptionList.Handler.preparer;
    $StringOptionList.processor = $StringOptionList.Handler.processor;
    function conf(config) { return { Handler: $StringOptionList.Handler, config }; }
    $StringOptionList.conf = conf;
    function init(config) { return new $StringOptionList.Handler(config); }
    $StringOptionList.init = init;
})($StringOptionList = exports.$StringOptionList || (exports.$StringOptionList = {}));
