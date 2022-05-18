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
    constructor(config, settings) {
        var _a;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.preprocessors = [
            async (data, { source }) => {
                var _a;
                const schema = await this.getSchema();
                Object.keys((_a = source()) !== null && _a !== void 0 ? _a : {}).filter(key => !(key in schema))
                    .forEach(key => this.warnings.push(new Data.ErrorIgnored([...this.path, key])));
                return data;
            },
        ];
        /**
         * The object data schema.
         */
        this.schema = {};
        this.schema = (_a = config.schema) !== null && _a !== void 0 ? _a : this.schema;
    }
    /**
     * {@inheritdoc}
     */
    get type() { return "object"; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return "Object"; }
    /**
     * Returns the data schema.
     *
     * @returns A promise that resolves with a data schema.
     */
    async getSchema() {
        var _a;
        return (_a = this._schema) !== null && _a !== void 0 ? _a : (this._schema = await this.prepareSchema());
    }
    /**
     * Returns the prepared data schema.
     *
     * @returns A promise that resolves with a prepared data schema.
     */
    async prepareSchema() {
        return this.schema;
    }
    /**
     * {@inheritdoc}
     */
    isValidType(data) {
        return Data.isObject(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const result = await this.convert(Data.Format.base, data, context);
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
     * Performs the data format conversion.
     *
     * @param format - The data format to convert the data to.
     * @param data - The data to convert.
     * @param context - The data context.
     *
     * @returns A promise that resolves with a converted data.
     */
    async convert(format, data, context) {
        const result = {};
        this.result = Data.set(this.result, this.path, result);
        const schema = await this.getSchema();
        for (const [key, definition] of Object.entries(schema)) {
            const handler = this.initHandler(definition, [...this.path, key])
                .in(this.format, data[key]);
            const value = await handler.to(format, context);
            undefined !== value && (result[key] = value);
        }
        return result;
    }
}
/**
 * The object data handler namespace.
 */
var $Object;
(function ($Object) {
    $Object.Handler = ObjectHandler;
    $Object.constraint = $Object.Handler.constraint;
    $Object.preparer = $Object.Handler.preparer;
    $Object.processor = $Object.Handler.processor;
    function conf(config) { return { Handler: $Object.Handler, config }; }
    $Object.conf = conf;
    function init(config) { return new $Object.Handler(config); }
    $Object.init = init;
})($Object = exports.$Object || (exports.$Object = {}));
