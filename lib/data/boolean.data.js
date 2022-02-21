"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = void 0;
const Data = require("..");
/**
 * The boolean data handler class.
 */
class $Boolean extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get id() { return "boolean"; }
    /**
     * {@inheritdoc}
     */
    get name() { return "Boolean"; }
    /**
     * {@inheritdoc}
     */
    isValid(data) {
        return "boolean" === typeof data;
    }
    /**
     * Configures the data handler.
     */
    static conf(config) {
        return [$Boolean, config];
    }
    /**
     * Initializes the data handler.
     */
    static init(config) {
        return new $Boolean({ config });
    }
}
exports.$Boolean = $Boolean;
