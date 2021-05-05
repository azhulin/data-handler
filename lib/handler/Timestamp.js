"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const Data = require("..");
/**
 * The timestamp data handler class.
 */
class Timestamp extends Data.Handler {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.id = "number.timestamp";
        /**
         * {@inheritdoc}
         */
        this.name = "Timestamp";
        /**
         * {@inheritdoc}
         */
        this.constraintLibrary = Object.assign(Object.assign({}, this.constraintLibrary), { ">now": (data) => data > +new Date() ? null : "Future date expected.", "<now": (data) => data < +new Date() ? null : "Past date expected." });
    }
    /**
     * {@inheritdoc}
     */
    get description() { return `e.g. ${+new Date()}`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.Util.isIndex(data);
    }
}
exports.default = Timestamp;
exports.Handler = Timestamp;
