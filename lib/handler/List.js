"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The list data handler class.
 */
class List extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: (_a = this.default.value) !== null && _a !== void 0 ? _a : [] });
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { unique: (data) => {
                const items = new Set();
                for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
                    if (items.has(item)) {
                        return [`Values are not unique.`, { index }];
                    }
                    items.add(item);
                }
                return null;
            } });
        const config = settings.config;
        if (!config.item) {
            throw new Data.Error.Internal(`${this.name} configuration is invalid. Missing 'item' property.`);
        }
        this.item = config.item;
        const { id, name } = this.getHandler();
        this.typeId = id;
        this.typeName = name;
    }
    /**
     * {@inheritdoc}
     */
    get id() {
        return `array<${this.typeId}>`;
    }
    /**
     * {@inheritdoc}
     */
    get name() {
        return `Array (${this.typeName})`;
    }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Array.isArray(data);
    }
    /**
     * {@inheritdoc}
     */
    async checkConstraint(constraint, data, context) {
        const matches = constraint.match(/^length([><]?=?)(\d+)$/);
        if (matches && matches[1]) {
            const length = +matches[2];
            switch (matches[1]) {
                case "=":
                    return data.length === length
                        ? null
                        : `Length should be equal to ${length}.`;
                case ">":
                    return data.length > length
                        ? null
                        : `Length should be greater than ${length}.`;
                case ">=":
                    return data.length >= length
                        ? null
                        : `Length should be greater than or equal to ${length}.`;
                case "<":
                    return data.length < length
                        ? null
                        : `Length should be lesser than ${length}.`;
                case "<=":
                    return data.length <= length
                        ? null
                        : `Length should be lesser than or equal to ${length}.`;
            }
        }
        return super.checkConstraint(constraint, data, context);
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
     * Common inputToBase/baseToStore/baseToOutput/storeToBase handler.
     */
    async convert(method, data, context) {
        const result = [];
        this.result = Data.Util.set(this.result, this.path, result);
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
}
exports.default = List;
exports.Handler = List;
