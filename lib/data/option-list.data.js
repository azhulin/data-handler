"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const __1 = require("..");
/**
 * The option list data handler class.
 */
class Handler extends __1.$List.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b, _c;
        super(Object.assign(Object.assign({}, settings), { config: Object.assign(Object.assign({}, settings.config), { item: __1.$Option.conf({
                    key_type: settings.config.key_type,
                    options: settings.config.options,
                }) }) }));
        /**
         * {@inheritdoc}
         */
        this.constraints = [...this.constraints, "unique"];
        /**
         * {@inheritdoc}
         */
        this.processorLibrary = Object.assign(Object.assign({}, this.processorLibrary), { order: (data) => {
                const keys = __1.$Option.Handler.optionKeys(this.options);
                return data.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));
            } });
        /**
         * The options.
         */
        this.options = [];
        /**
         * Whether to keep the items order from the input.
         */
        this.preserve = false;
        const config = (_a = settings.config) !== null && _a !== void 0 ? _a : {};
        this.options = (_b = config.options) !== null && _b !== void 0 ? _b : this.options;
        this.preserve = (_c = config.preserve) !== null && _c !== void 0 ? _c : this.preserve;
        this.preserve || this.postprocessors.push("order");
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
