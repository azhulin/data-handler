"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./Handler");
const plugin_manager_1 = require("@azhulin/plugin-manager");
/**
 * The data handler manager.
 */
class Manager extends plugin_manager_1.default {
    /**
     * Constructor for the Manager object.
     */
    constructor() {
        super(Handler_1.default);
        this.register("handler", __dirname);
    }
    handler(type, config) {
        var _a;
        (_a = Handler_1.default.definitionNormalize(type, config), { type } = _a, config = __rest(_a, ["type"]));
        const settings = { config, pluginManager: this };
        return this.instance(type, settings);
    }
}
exports.default = Manager;
