"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$StringOption = void 0;
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
            ["option", data => this.optionKeys().includes(data)
                    ? null
                    : [`${this.name} options do not contain the specified value.`, {
                            options: this.options,
                        }],
            ],
        ];
        /**
         * The options.
         */
        this.options = [];
        this.options = (_a = config.options) !== null && _a !== void 0 ? _a : this.options;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".option"; }
    /**
     * Returns the option keys.
     *
     * @returns An array of strings representing the option keys.
     */
    optionKeys() {
        return StringOptionHandler.optionKeys(this.options);
    }
    /**
     * Returns the option keys of the specified options.
     *
     * @param options - The options.
     *
     * @returns An array of strings representing the keys of the specified
     *   options.
     */
    static optionKeys(options) {
        return Array.isArray(options) ? options : Object.keys(options);
    }
}
/**
 * The string option data handler namespace.
 */
var $StringOption;
(function ($StringOption) {
    $StringOption.Handler = StringOptionHandler;
    $StringOption.constraint = $StringOption.Handler.constraint;
    $StringOption.preparer = $StringOption.Handler.preparer;
    $StringOption.processor = $StringOption.Handler.processor;
    function conf(config) { return { Handler: $StringOption.Handler, config }; }
    $StringOption.conf = conf;
    function init(config) { return new $StringOption.Handler(config); }
    $StringOption.init = init;
})($StringOption = exports.$StringOption || (exports.$StringOption = {}));
