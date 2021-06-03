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
     * The prepared schema.
     */
    get preparedSchema() {
        var _a;
        return (_a = this._preparedSchema) !== null && _a !== void 0 ? _a : (this._preparedSchema = this.prepareSchema());
    }
    /**
     * Prepares the schema.
     */
    prepareSchema() {
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
        Object.keys(data).filter(key => !(key in this.preparedSchema))
            .forEach(key => this.warn(new Data.ErrorIgnored([...this.path, key])));
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
        this.result = Data.set(this.result, this.path, result);
        for (const key of Object.keys(this.preparedSchema)) {
            const value = await this.getHandler(key, data[key])[method](context);
            undefined !== value && (result[key] = value);
        }
        return result;
    }
    /**
     * Returns data handler.
     */
    getHandler(key, data) {
        return this.initHandler(this.preparedSchema[key], [...this.path, key])
            .initData(this.format, data);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
