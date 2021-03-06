"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$NumberOption = void 0;
const _1 = require(".");
/**
 * The number option data handler class.
 */
class $ extends _1.$Number.Handler {
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
            [`${$.id}:valid`, data => this.optionKeys().includes(data)
                    ? null
                    : [`${this.name} options do not contain the specified value.`, {
                            options: this.options instanceof Map
                                ? [...this.options.entries()]
                                : this.options,
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
     * Returns the option keys.
     *
     * @returns An array of numbers representing the option keys.
     */
    optionKeys() {
        return $.optionKeys(this.options);
    }
    /**
     * Returns the option keys of the specified options.
     *
     * @param options - The options.
     *
     * @returns An array of numbers representing the keys of the specified
     *   options.
     */
    static optionKeys(options) {
        return Array.isArray(options) ? options : [...options.keys()];
    }
}
/**
 * {@inheritdoc}
 */
$.id = `${_1.$Number.id}.option`;
/**
 * The number option data handler namespace.
 */
var $NumberOption;
(function ($NumberOption) {
    $NumberOption.Handler = $;
    $NumberOption.id = $.id, $NumberOption.constraint = $.constraint, $NumberOption.preparer = $.preparer, $NumberOption.processor = $.processor;
    function conf(config) { return $.conf($, config); }
    $NumberOption.conf = conf;
    function init(config) { return $.init($, config); }
    $NumberOption.init = init;
})($NumberOption = exports.$NumberOption || (exports.$NumberOption = {}));
