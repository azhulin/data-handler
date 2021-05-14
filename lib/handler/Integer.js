"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Handler = void 0;
const $Number = require("./Number");
/**
 * The integer data handler class.
 */
class Handler extends $Number.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.id = this.id + ".integer";
        /**
         * {@inheritdoc}
         */
        this.name = "Integer";
        /**
         * {@inheritdoc}
         */
        this.decimals = 0;
    }
    /**
     * {@inheritdoc}
     */
    get description() { return; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return super.isValid(data) && Number.isInteger(data);
    }
}
exports.Handler = Handler;
function conf(config) { return Object.assign({ Handler }, config); }
exports.conf = conf;
function init(config) { return new Handler({ config }); }
exports.init = init;
