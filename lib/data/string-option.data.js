"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$StringOption = void 0;
const Data = require("..");
const _1 = require(".");
/**
 * The string option data handler class.
 */
class StringOptionHandler extends _1.$String.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(config, settings) {
        var _a;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            new Data.Constraint("option", data => this.optionKeys().includes(data)
                ? null
                : [`${this.label} options do not contain the specified value.`, {
                        type: this.id,
                        options: this.options,
                    }]),
        ];
        /**
         * The options.
         */
        this.options = [];
        this.options = (_a = config.options) !== null && _a !== void 0 ? _a : this.options;
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
        return StringOptionHandler.optionKeys(this.options);
    }
    /**
     * Returns option keys.
     */
    static optionKeys(options) {
        return Array.isArray(options) ? options : Object.keys(options);
    }
}
var $StringOption;
(function ($StringOption) {
    $StringOption.Handler = StringOptionHandler;
    $StringOption.constraint = $StringOption.Handler.constraint;
    $StringOption.preparer = $StringOption.Handler.preparer;
    $StringOption.processor = $StringOption.Handler.processor;
    function conf(config = {}) { return { Handler: $StringOption.Handler, config }; }
    $StringOption.conf = conf;
    function init(config = {}) { return new $StringOption.Handler(config); }
    $StringOption.init = init;
})($StringOption = exports.$StringOption || (exports.$StringOption = {}));
