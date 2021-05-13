"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const Data = require("..");
/**
 * The object data handler class.
 */
class Handler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.id = "object";
        /**
         * {@inheritdoc}
         */
        this.name = "Object";
        /**
         * The raw schema.
         */
        this.schemaRaw = {};
        /**
         * Whether to use default value, if all schema keys are optional and equal to Null.
         */
        this.reduce = false;
        const config = settings.config;
        this.schemaRaw = (_a = config.schema) !== null && _a !== void 0 ? _a : this.schemaRaw;
        this.reduce = (_b = config.reduce) !== null && _b !== void 0 ? _b : this.reduce;
    }
    /**
     * The schema.
     */
    get schema() {
        var _a;
        return (_a = this._schema) !== null && _a !== void 0 ? _a : (this._schema = this.prepareSchema());
    }
    /**
     * Prepares the schema.
     */
    prepareSchema() {
        return this.schemaRaw;
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.Util.isObject(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        Object.keys(data).filter(key => !(key in this.schema))
            .forEach(key => this.warn(new Data.Error.Ignored([...this.path, key])));
        let result = await this.convert("toBase", data, context);
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
        const result = await this.convert("toStore", data, context);
        return super.baseToStore(result, context);
    }
    /**
     * {@inheritdoc}
     */
    async baseToOutput(data, context) {
        const result = await this.convert("toOutput", data, context);
        return super.baseToOutput(result, context);
    }
    /**
     * {@inheritdoc}
     */
    async storeToBase(data, context) {
        const result = await this.convert("toBase", data, context);
        return super.storeToBase(result, context);
    }
    /**
     * Performs format conversion.
     */
    async convert(method, data, context) {
        const result = {};
        this.result = Data.Util.set(this.result, this.path, result);
        for (const key of Object.keys(this.schema)) {
            const value = await this.getHandler(key, data[key])[method](context);
            undefined !== value && (result[key] = value);
        }
        return result;
    }
    /**
     * Returns data handler.
     */
    getHandler(key, data) {
        return this.initHandler(this.schema[key], [...this.path, key])
            .initData(this.format, data);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign({ Handler }, config); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
