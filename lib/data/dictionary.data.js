"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Dictionary = void 0;
const Data = require("..");
const _1 = require(".");
/**
 * The dictionary data handler class.
 */
class DictionaryHandler extends _1.$Object.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(config, settings) {
        var _a, _b;
        super(config, settings);
        this.key = (_a = config.key) !== null && _a !== void 0 ? _a : this.key;
        this.value = (_b = config.value) !== null && _b !== void 0 ? _b : this.value;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".dictionary"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Dictionary"; }
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
        for (const [dataKey, dataValue] of Object.entries(data)) {
            let key;
            try {
                key = await keyHandler.in(this.format, dataKey).to(format, context);
            }
            catch (error) {
                if (error instanceof Data.ErrorExpected) {
                    const { type, message, details } = error;
                    throw new Data.ErrorConstraint(this, "valid_key", "Object key is invalid.", {
                        key: { value: dataKey, error: { type, message, details } },
                    });
                }
                throw error;
            }
            if ("string" === typeof key) {
                const valueHandler = this.initHandler(this.getValue(), [...this.path, dataKey]);
                const value = await valueHandler.in(this.format, dataValue).to(format, context);
                undefined !== value && (result[key] = value);
            }
        }
        return result;
    }
}
/**
 * {@inheritdoc}
 */
DictionaryHandler.constraint = Object.assign(Object.assign({}, _1.$Object.Handler.constraint), { items_number: Data.inequalityConstraints("dictionary_items_number", data => Object.keys(data).length, "Number of dictionary items") });
/**
 * The dictionary data handler namespace.
 */
var $Dictionary;
(function ($Dictionary) {
    $Dictionary.Handler = DictionaryHandler;
    $Dictionary.constraint = $Dictionary.Handler.constraint;
    $Dictionary.preparer = $Dictionary.Handler.preparer;
    $Dictionary.processor = $Dictionary.Handler.processor;
    function conf(config) { return { Handler: $Dictionary.Handler, config }; }
    $Dictionary.conf = conf;
    function init(config) { return new $Dictionary.Handler(config); }
    $Dictionary.init = init;
})($Dictionary = exports.$Dictionary || (exports.$Dictionary = {}));
