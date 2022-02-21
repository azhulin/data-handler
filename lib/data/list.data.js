"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$List = void 0;
const Data = require("..");
/**
 * The list data handler class.
 */
class $List extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: ((_a = this.default.value) !== null && _a !== void 0 ? _a : []) });
        const config = ((_b = settings.config) !== null && _b !== void 0 ? _b : {});
        if (!config.item) {
            throw new Data.ErrorUnexpected(`List configuration is invalid. Missing 'item' property.`);
        }
        this.item = config.item;
        const { id, name } = this.getHandler();
        this.typeId = id;
        this.typeName = name;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return `array<${this.typeId}>`; }
    /**
     * {@inheritdoc}
     */
    get name() { return `${this.typeName} array`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Array.isArray(data);
    }
    /**
     * {@inheritdoc}
     */
    async inputToBase(data, context) {
        const result = await this.convert("toBase", data, context);
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
        const result = [];
        this.result = Data.set(this.result, this.path, result);
        const indexes = [];
        for (const [index, item] of data.entries()) {
            const value = await this.getHandler(index, item)[method](context);
            undefined !== value ? result[index] = value : indexes.push(index);
        }
        indexes.reduce((delta, index) => (result.splice(index - delta++, 1), delta), 0);
        return result;
    }
    /**
     * Returns data handler.
     */
    getHandler(index, data) {
        return this.initHandler(this.item, [...this.path, index !== null && index !== void 0 ? index : "#"])
            .initData(this.format, data);
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$List, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $List({ config });
    }
}
exports.$List = $List;
/**
 * {@inheritdoc}
 */
$List.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { length: {
        eq: (length) => [
            `length=${length}`,
            data => data.length === length ? null : `Length should be equal to ${length}.`,
        ],
        gt: (length) => [
            `length>${length}`,
            data => data.length > length ? null : `Length should be greater than ${length}.`,
        ],
        gte: (length) => [
            `length>=${length}`,
            data => data.length >= length ? null : `Length should be greater than or equal to ${length}.`,
        ],
        lt: (length) => [
            `length<${length}`,
            data => data.length < length ? null : `Length should be lesser than ${length}.`,
        ],
        lte: (length) => [
            `length<=${length}`,
            data => data.length <= length ? null : `Length should be lesser than or equal to ${length}.`,
        ],
        neq: (length) => [
            `length<>${length}`,
            data => data.length !== length ? null : `Length should not be equal to ${length}.`,
        ],
    }, unique: [
        "unique",
        data => {
            const items = new Set();
            for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
                if (items.has(item)) {
                    return [`Values are not unique.`, { index }];
                }
                items.add(item);
            }
            return null;
        }
    ] });
