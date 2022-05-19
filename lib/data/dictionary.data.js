"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Dictionary = void 0;
const Data = require("..");
const _1 = require(".");
/**
 * The dictionary data handler class.
 */
class $ extends _1.$Object.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(config, settings) {
        var _a, _b;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.name = "Dictionary";
        /**
         * {@inheritdoc}
         */
        this.warnExtraKeys = false;
        this.schema = {};
        this.key = (_a = config.key) !== null && _a !== void 0 ? _a : this.key;
        this.value = (_b = config.value) !== null && _b !== void 0 ? _b : this.value;
    }
    /**
     * {@inheritdoc}
     *
     * @throws {@link Data.ErrorConstraint}
     * Thrown if dictionary key failed validation.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if unexpectted error occured during dictionary key validation.
     */
    async convert(format, data, context) {
        const result = {};
        this.result = Data.set(this.result, this.path, result);
        const keyHandler = this.initHandler(this.getKey());
        const valueDefinition = this.getValue();
        for (const [dataKey, dataValue] of Object.entries(data)) {
            let key;
            try {
                key = await keyHandler.in(this.format, dataKey).to(format, context);
            }
            catch (error) {
                if (error instanceof Data.ErrorExpected) {
                    const { type, message, details } = error;
                    throw new Data.ErrorConstraint(this, `${$.id}:key_valid`, "Object key is invalid.", {
                        key: { value: dataKey, error: { type, message, details } },
                    });
                }
                throw error;
            }
            if ("string" === typeof key) {
                const valueHandler = this.initHandler(valueDefinition, [...this.path, dataKey]);
                const value = await valueHandler.in(this.format, dataValue).to(format, context);
                undefined !== value && (result[key] = value);
            }
        }
        return result;
    }
    /**
     * Returns the dictionary key data definition.
     *
     * @returns Dictionary key data definition.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `key` data handler property is missing.
     */
    getKey() {
        if (!this.key) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'key' property.`);
        }
        return this.key;
    }
    /**
     * Returns the dictionary value data definition.
     *
     * @returns Dictionary value data definition.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `value` data handler property is missing.
     */
    getValue() {
        if (!this.value) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'value' property.`);
        }
        return this.value;
    }
}
/**
 * {@inheritdoc}
 */
$.id = `${_1.$Object.id}.dictionary`;
/**
 * {@inheritdoc}
 */
$.constraint = Object.assign(Object.assign({}, _1.$Object.constraint), { items_number: Data.inequalityConstraints(`${$.id}:items_number`, data => Object.keys(data).length, "Number of dictionary items") });
/**
 * The dictionary data handler namespace.
 */
var $Dictionary;
(function ($Dictionary) {
    $Dictionary.Handler = $;
    $Dictionary.id = $.id, $Dictionary.constraint = $.constraint, $Dictionary.preparer = $.preparer, $Dictionary.processor = $.processor;
    function conf(config) { return $.conf($, config); }
    $Dictionary.conf = conf;
    function init(config) { return $.init($, config); }
    $Dictionary.init = init;
})($Dictionary = exports.$Dictionary || (exports.$Dictionary = {}));
