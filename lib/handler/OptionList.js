"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const $List = require("./List");
const $Option = require("./Option");
/**
 * The option list data handler class.
 */
class Handler extends $List.Handler {
    /**
     * {@inheritdoc}
     */
    constructor(settings) {
        var _a, _b;
        super(Object.assign(Object.assign({}, settings), { config: Object.assign(Object.assign({}, settings.config), { item: $Option.conf({
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
                const keys = $Option.Handler.optionKeys(this.options);
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
        const config = settings.config;
        this.options = (_a = config.options) !== null && _a !== void 0 ? _a : this.options;
        this.preserve = (_b = config.preserve) !== null && _b !== void 0 ? _b : this.preserve;
        this.preserve || this.postprocessors.push("order");
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign(Object.assign({}, config), { Handler }); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
