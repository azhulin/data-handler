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
    constructor(settings) {
        var _a;
        super(settings);
        const { key, value } = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        if (!key) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'key' property.`);
        }
        if (!value) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Missing 'value' property.`);
        }
        if (key.Handler !== _1.$String.Handler && !(key.Handler.prototype instanceof _1.$String.Handler)) {
            throw new Data.ErrorUnexpected(`${this.label} configuration is invalid. Key handler must inherit a string handler.`);
        }
        this.key = key;
        this.value = value;
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
DictionaryHandler.constraint = Object.assign(Object.assign({}, _1.$Object.Handler.constraint), { keys_number: Data.inequalityConstraints("keys_number", data => Object.keys(data).length, "Number of keys") });
var $Dictionary;
(function ($Dictionary) {
    $Dictionary.Handler = DictionaryHandler;
    $Dictionary.constraint = $Dictionary.Handler.constraint;
    $Dictionary.preparer = $Dictionary.Handler.preparer;
    $Dictionary.processor = $Dictionary.Handler.processor;
    function conf(config) { return { Handler: $Dictionary.Handler, config }; }
    $Dictionary.conf = conf;
    function init(config) { return new $Dictionary.Handler({ config }); }
    $Dictionary.init = init;
})($Dictionary = exports.$Dictionary || (exports.$Dictionary = {}));
