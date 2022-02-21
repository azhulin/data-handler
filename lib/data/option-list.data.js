"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$OptionList = void 0;
const _1 = require(".");
/**
 * The option list data handler class.
 */
class $OptionList extends _1.$List {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b, _c;
        super(Object.assign(Object.assign({}, settings), { config: Object.assign(Object.assign({}, settings.config), { item: _1.$Option.conf({
                    key_type: settings.config.key_type,
                    options: settings.config.options,
                }) }) }));
        /**
         * {@inheritdoc}
         */
        this.constraints = [
            ...this.constraints,
            _1.$List.constraint.unique,
        ];
        /**
         * The options.
         */
        this.options = [];
        /**
         * Whether to keep the items order from the input.
         */
        this.preserve = false;
        const config = ((_a = settings.config) !== null && _a !== void 0 ? _a : {});
        this.options = (_b = config.options) !== null && _b !== void 0 ? _b : this.options;
        this.preserve = (_c = config.preserve) !== null && _c !== void 0 ? _c : this.preserve;
        this.preserve || this.postprocessors.push($OptionList.processor.order);
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$OptionList, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $OptionList({ config });
    }
}
exports.$OptionList = $OptionList;
/**
 * {@inheritdoc}
 */
$OptionList.processor = Object.assign(Object.assign({}, _1.$List.processor), { order: (data, { handler }) => {
        const keys = _1.$Option.optionKeys(handler.options);
        return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
    } });
