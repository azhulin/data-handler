"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$NumberOption = void 0;
const Data = require("..");
const _1 = require(".");
/**
 * The number option data handler class.
 */
class NumberOptionHandler extends _1.$Number.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            new Data.Constraint("option", data => this.optionKeys().includes(data)
                ? null
                : [`${this.label} options do not contain the specified value.`, {
                        type: this.id,
                        options: this.options instanceof Map ? [...this.options.entries()] : this.options,
                    }]),
        ];
        /**
         * The options.
         */
        this.options = [];
        const config = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        this.options = (_b = config.options) !== null && _b !== void 0 ? _b : this.options;
        if (!this.optionKeys().every(key => super.isValid(key))) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Option keys don't match key type.`);
        }
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".option"; }
    /**
     * Returns option keys.
     */
    optionKeys() {
        return NumberOptionHandler.optionKeys(this.options);
    }
    /**
     * Returns option keys.
     */
    static optionKeys(options) {
        return Array.isArray(options) ? options : [...options.keys()];
    }
}
var $NumberOption;
(function ($NumberOption) {
    $NumberOption.Handler = NumberOptionHandler;
    $NumberOption.constraint = $NumberOption.Handler.constraint;
    $NumberOption.preparer = $NumberOption.Handler.preparer;
    $NumberOption.processor = $NumberOption.Handler.processor;
    function conf(config) { return { Handler: $NumberOption.Handler, config }; }
    $NumberOption.conf = conf;
    function init(config) { return new $NumberOption.Handler({ config }); }
    $NumberOption.init = init;
})($NumberOption = exports.$NumberOption || (exports.$NumberOption = {}));
