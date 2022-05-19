"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$StringOptionList = void 0;
const _1 = require(".");
/**
 * The string option list data handler class.
 */
class $ extends _1.$List.Handler {
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
            _1.$List.constraint.items_unique,
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
    }
    /**
     * {@inheritdoc}
     */
    getItem() {
        var _a;
        this.item = (_a = this.item) !== null && _a !== void 0 ? _a : _1.$StringOption.conf({
            options: this.options,
        });
        return super.getItem();
    }
}
/**
 * {@inheritdoc}
 */
$.id = `${_1.$List.id}.string.option`;
/**
 * The string option list data handler namespace.
 */
var $StringOptionList;
(function ($StringOptionList) {
    $StringOptionList.Handler = $;
    $StringOptionList.id = $.id, $StringOptionList.constraint = $.constraint, $StringOptionList.preparer = $.preparer, $StringOptionList.processor = $.processor;
    function conf(config) { return $.conf($, config); }
    $StringOptionList.conf = conf;
    function init(config) { return $.init($, config); }
    $StringOptionList.init = init;
})($StringOptionList = exports.$StringOptionList || (exports.$StringOptionList = {}));
