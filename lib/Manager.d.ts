import type { Config, Definition } from "./type";
import Handler from "./Handler";
import PluginManager from "@azhulin/plugin-manager";
/**
 * The data handler manager.
 */
export default class Manager extends PluginManager {
    /**
     * Constructor for the Manager object.
     */
    constructor();
    /**
     * Returns a data handler for the specified data type or data definition.
     */
    handler(definition: Definition): Handler;
    handler(type: string, config?: Config): Handler;
}
