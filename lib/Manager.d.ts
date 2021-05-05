import type { Config, Definition } from "./type";
import Handler from "./Handler";
import PluginManager from "@azhulin/plugin-manager";
/**
 * The data handler manager.
 */
export default class Manager {
    /**
     * The handlers info.
     */
    get info(): Record<string, {
        path: string;
    }>;
    /**
     * The plugin manager.
     */
    protected pluginManager: PluginManager;
    /**
     * Constructor for the Manager object.
     */
    constructor(path?: string | string[], dirname?: string, match?: string | RegExp | (string | RegExp)[]);
    /**
     * Returns a data handler for the specified data type or data definition.
     */
    handler(definition: Definition): Handler;
    handler(type: string, config?: Config): Handler;
}
