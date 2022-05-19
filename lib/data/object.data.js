"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Object = void 0;
const Data = require("..");
/**
 * The object data handler class.
 */
class $ extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(config, settings) {
        var _a;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.name = "Object";
        /**
         * {@inheritdoc}
         */
        this.type = $.id;
        /**
         * {@inheritdoc}
         */
        this.typeName = this.name;
        /**
         * {@inheritdoc}
         */
        this.preprocessors = [
            async (data, { source }) => {
                var _a;
                if (this.warnExtraKeys) {
                    const schema = await this.getSchema();
                    Object.keys((_a = source()) !== null && _a !== void 0 ? _a : {}).filter(key => !(key in schema)).forEach(key => this.warnings.push(new Data.ErrorIgnored([...this.path, key])));
                }
                return data;
            },
        ];
        /**
         * Whether to generate warnings if data contains keys missing in data schema.
         */
        this.warnExtraKeys = true;
        this.schema = (_a = config.schema) !== null && _a !== void 0 ? _a : this.schema;
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
    /**
     * Returns the data schema.
     *
     * @returns A data schema.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `schema` data handler property is missing.
     */
    async getSchema() {
        if (!this.schema) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'schema' property.`);
        }
        return this.schema;
    }
}
/**
 * {@inheritdoc}
 */
$.id = "object";
/**
 * The object data handler namespace.
 */
var $Object;
(function ($Object) {
    $Object.Handler = $;
    $Object.id = $.id, $Object.constraint = $.constraint, $Object.preparer = $.preparer, $Object.processor = $.processor;
    function conf(config) { return $.conf($, config); }
    $Object.conf = conf;
    function init(config) { return $.init($, config); }
    $Object.init = init;
})($Object = exports.$Object || (exports.$Object = {}));
