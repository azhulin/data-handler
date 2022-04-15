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
        super(Object.assign(Object.assign({}, config), { item: _1.$StringOption.conf({
                options: config.options,
            }) }), settings);
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            _1.$List.constraint.unique,
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
        this.preserve || this.postprocessors.push($StringOptionList.processor.order);
    }
}
/**
 * {@inheritdoc}
 */
StringOptionListHandler.processor = Object.assign(Object.assign({}, _1.$List.processor), { order: ((data, { handler }) => {
        const keys = _1.$StringOption.Handler.optionKeys(handler.options);
        return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
    }) });
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
