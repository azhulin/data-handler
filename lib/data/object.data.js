"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Object = void 0;
const Data = require("..");
/**
 * The object data handler class.
 */
class ObjectHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b, _c;
        super(settings);
        /**
         * The schema.
         */
        this.schema = {};
        /**
         * Whether to use default value, if all schema keys are optional and equal to Null.
         */
        this.reduce = false;
        const config = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        this.schema = (_b = config.schema) !== null && _b !== void 0 ? _b : this.schema;
        this.reduce = (_c = config.reduce) !== null && _c !== void 0 ? _c : this.reduce;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return "object"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Object"; }
    /**
     * Returns prepared schema.
     */
    async getSchema(format, context) {
        var _a;
        return (_a = this._schema) !== null && _a !== void 0 ? _a : (this._schema = await this.prepareSchema(format, context));
    }
    /**
     * Prepares the schema.
     */
    async prepareSchema(format, context) {
        return this.schema;
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.isObject(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const format = Data.Format.base;
        const schema = await this.getSchema(format, context);
        Object.keys(data).filter(key => !(key in schema))
            .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])));
        let result = await this.convert(format, data, context);
        if (this.reduce && Object.values(result).every(value => null === value)
            && !await this.isRequired(context)) {
            result = await this.getDefault(context);
        }
        return super.inputToBase(result, context);
    }
    /**
     * {@inheritdoc}
     */
    async baseToStore(data, context) {
        const result = await this.convert(Data.Format.store, data, context);
        return super.baseToStore(result, context);
    }
    /**
     * {@inheritdoc}
     */
    async baseToOutput(data, context) {
        const result = await this.convert(Data.Format.output, data, context);
        return super.baseToOutput(result, context);
    }
    /**
     * {@inheritdoc}
     */
    async storeToBase(data, context) {
        const result = await this.convert(Data.Format.base, data, context);
        return super.storeToBase(result, context);
    }
    /**
     * Performs format conversion.
     */
    async convert(format, data, context) {
        const result = {};
        this.result = Data.set(this.result, this.path, result);
        const schema = await this.getSchema(format, context);
        const { base, store, output } = Data.Format;
        const map = { [base]: "toBase", [store]: "toStore", [output]: "toOutput" };
        const method = map[format];
        for (const [key, definition] of Object.entries(schema)) {
            const handler = this.initHandler(definition, [...this.path, key])
                .initData(this.format, data[key]);
            const value = await handler[method](context);
            undefined !== value && (result[key] = value);
        }
        return result;
    }
}
var $Object;
(function ($Object) {
    $Object.Handler = ObjectHandler;
    $Object.constraint = $Object.Handler.constraint;
    $Object.preparer = $Object.Handler.preparer;
    $Object.processor = $Object.Handler.processor;
    function conf(config) { return { Handler: $Object.Handler, config }; }
    $Object.conf = conf;
    function init(config) { return new $Object.Handler({ config }); }
    $Object.init = init;
})($Object = exports.$Object || (exports.$Object = {}));
