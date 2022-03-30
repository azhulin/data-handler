"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$List = void 0;
const Data = require("..");
/**
 * The list data handler class.
 */
class ListHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(settings);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: (_a = this.default.value) !== null && _a !== void 0 ? _a : [] });
        const config = ((_b = settings.config) !== null && _b !== void 0 ? _b : {});
        if (!config.item) {
            throw new Data.ErrorUnexpected("List configuration is invalid. Missing 'item' property.");
        }
        this.item = config.item;
        const { id, name } = this.getHandler();
        this.itemId = id;
        this.itemName = name;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return `array<${this.itemId}>`; }
    /**
     * {@inheritdoc}
     */
    get name() { return `${this.itemName} array`; }
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
}
/**
 * {@inheritdoc}
 */
ListHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { length: Data.inequalityConstraints("length", data => data.length, "Length"), unique: new Data.Constraint("unique", data => {
        const items = new Set();
        for (const [index, item] of data.map(i => JSON.stringify(i)).entries()) {
            if (items.has(item)) {
                return [`Values are not unique.`, { index }];
            }
            items.add(item);
        }
        return null;
    }) });
var $List;
(function ($List) {
    $List.Handler = ListHandler;
    $List.constraint = $List.Handler.constraint;
    $List.preparer = $List.Handler.preparer;
    $List.processor = $List.Handler.processor;
    function conf(config) { return { Handler: $List.Handler, config }; }
    $List.conf = conf;
    function init(config) { return new $List.Handler({ config }); }
    $List.init = init;
})($List = exports.$List || (exports.$List = {}));
