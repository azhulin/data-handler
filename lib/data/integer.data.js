"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Integer = void 0;
const _1 = require(".");
/**
 * The integer data handler class.
 */
class $Integer extends _1.$Number {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.decimals = 0;
    }
    /**
     * {@inheritdoc}
     */
    get id() { return super.id + ".integer"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Integer"; }
    /**
     * {@inheritdoc}
     */
    get description() { return ""; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return super.isValid(data) && Number.isInteger(data);
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$Integer, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $Integer({ config });
    }
}
exports.$Integer = $Integer;
