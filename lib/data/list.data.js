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
    constructor(config, settings) {
        var _a, _b;
        super(config, settings);
        /**
         * {@inheritdoc}
         */
        this.default = Object.assign(Object.assign({}, this.default), { value: undefined !== ((_a = this.config.default) === null || _a === void 0 ? void 0 : _a.value) ? this.default.value : [] });
        this.item = (_b = config.item) !== null && _b !== void 0 ? _b : this.item;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return `list.${this.itemHandler.id}`; }
    /**
     * {@inheritdoc}
     */
    get name() { return `${this.itemHandler.name} list`; }
    /**
     * {@inheritdoc}
     */
    get type() { return `array<${this.itemHandler.type}>`; }
    /**
     * {@inheritdoc}
     */
    get typeName() { return `${this.itemHandler.typeName} array`; }
    /**
     * The list item data handler.
     */
    get itemHandler() {
        var _a;
        return (_a = this._itemHandler) !== null && _a !== void 0 ? _a : (this._itemHandler = this.getHandler());
    }
    /**
     * {@inheritdoc}
     */
    isValidType(data) {
        return Array.isArray(data);
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
        const result = [];
        this.result = Data.set(this.result, this.path, result);
        const indexes = [];
        for (const [index, item] of data.entries()) {
            const value = await this.getHandler(index, item).to(format, context);
            undefined !== value ? result[index] = value : indexes.push(index);
        }
        indexes.reduce((delta, index) => (result.splice(index - delta++, 1), delta), 0);
        return result;
    }
    /**
     * Returns the list item data handler instance for the specified list index.
     *
     * @param index - The list index to return the list item data handler instance
     *   for.
     * @param data - The list item data.
     *
     * @returns A list item data handler instance for the specified list index.
     */
    getHandler(index, data) {
        return this.initHandler(this.getItem(), [...this.path, index !== null && index !== void 0 ? index : "#"])
            .in(this.format, data);
    }
    /**
     * Returns the list item data definition.
     *
     * @returns List item data definition.
     *
     * @throws {@link Data.ErrorUnexpected}
     * Thrown if the `item` data handler property is missing.
     */
    getItem() {
        if (!this.item) {
            throw new Data.ErrorUnexpected(`${this.name} configuration is invalid. Missing 'item' property.`);
        }
        return this.item;
    }
}
/**
 * {@inheritdoc}
 */
ListHandler.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { length: Data.inequalityConstraints("length", data => data.length, "Length"), unique: ["unique", data => {
            const items = new Set();
            for (const [index, item] of data.entries()) {
                if (items.has(item)) {
                    return ["Values are not unique.", { index }];
                }
                items.add(item);
            }
            return null;
        }] });
/**
 * The list data handler namespace.
 */
var $List;
(function ($List) {
    $List.Handler = ListHandler;
    $List.constraint = $List.Handler.constraint;
    $List.preparer = $List.Handler.preparer;
    $List.processor = $List.Handler.processor;
    function conf(config) { return { Handler: $List.Handler, config }; }
    $List.conf = conf;
    function init(config) { return new $List.Handler(config); }
    $List.init = init;
})($List = exports.$List || (exports.$List = {}));
