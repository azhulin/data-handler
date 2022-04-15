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
        super(Object.assign(Object.assign({}, config), { item: _1.$NumberOption.conf({
                options: config.options,
            }) }), settings);
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            $NumberOptionList.constraint.unique,
        ];
        /**
         * The options.
         */
        this.options = [];
        /**
         * Whether to keep the items order from the input.
         */
        this.preserve = false;
        this.options = (_a = config.options) !== null && _a !== void 0 ? _a : this.options;
        this.preserve = (_b = config.preserve) !== null && _b !== void 0 ? _b : this.preserve;
        this.preserve || this.postprocessors.push($NumberOptionList.processor.order);
    }
}
/**
 * {@inheritdoc}
 */
NumberOptionListHandler.processor = Object.assign(Object.assign({}, _1.$List.Handler.processor), { order: ((data, { handler }) => {
        const keys = _1.$NumberOption.Handler.optionKeys(handler.options);
        return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
    }) });
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
