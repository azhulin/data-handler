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
        super(config, settings);
        const { key, value } = config;
        key && (this.key = key);
        value && (this.value = value);
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".dictionary"; }
    /**
     * {@inheritdoc}
     */
    get label() { return "Dictionary"; }
    /**
     * {@inheritdoc}
     */
    async prepareSchema(format) {
        if (!this.key) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'key' property.`);
        }
        if (!this.value) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'value' property.`);
        }
        if (this.key.Handler !== _1.$String.Handler && !(this.key.Handler.prototype instanceof _1.$String.Handler)) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Key handler must inherit a string handler.`);
        }
        const handler = this.initHandler(this.key);
        for (const value of Object.keys(this.data)) {
            let key;
            try {
                key = await handler.initData(this.format, value).formatData(format);
            }
            catch (error) {
                if (error instanceof Data.ErrorExpected) {
                    const { type, message, details } = error;
                    throw new Data.ErrorConstraint("Object key is invalid.", this.path, this.id, "valid_key", {
                        key: { value, error: { type, message, details } },
                    });
                }
                throw error;
            }
            this.schema[key] = this.value;
        }
        return this.schema;
    }
}
/**
 * {@inheritdoc}
 */
DictionaryHandler.constraint = Object.assign(Object.assign({}, _1.$Object.Handler.constraint), { items_number: Data.inequalityConstraints("items_number", data => Object.keys(data).length, "Number of items") });
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
