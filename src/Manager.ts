/// <reference types="node" />
import type { Config, Definition, Settings } from "./type"
import Handler from "./Handler"
import PluginManager from "@azhulin/plugin-manager"

/**
 * The data handler manager.
 */
export default class Manager extends PluginManager {

  /**
   * Constructor for the Manager object.
   */
  public constructor() {
    super(Handler)
    this.register("handler", __dirname)
  }

  /**
   * Returns a data handler for the specified data type or data definition.
   */
  public handler(definition: Definition): Handler
  public handler(type: string, config?: Config): Handler
  public handler(type: string | Definition, config?: Config): Handler {
    ({ type, ...config } = Handler.definitionNormalize(type, config))
    const settings: Settings = { config, pluginManager: this }
    return this.instance(type, settings)
  }

}
