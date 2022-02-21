"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Timestamp = void 0;
const Data = require("..");
/**
 * The timestamp data handler class.
 */
class $Timestamp extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get id() { return "number.timestamp"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Timestamp"; }
    /**
     * {@inheritdoc}
     */
    get description() { return `e.g. ${+new Date()}`; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return Data.isIndex(data);
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$Timestamp, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $Timestamp({ config });
    }
}
exports.$Timestamp = $Timestamp;
/**
 * {@inheritdoc}
 */
$Timestamp.constraint = Object.assign(Object.assign({}, Data.Handler.constraint), { future: [
        ">now",
        data => data > +new Date() ? null : "Future date expected.",
    ], past: [
        "<now",
        data => data < +new Date() ? null : "Past date expected.",
    ] });
