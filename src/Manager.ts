/// <reference types="node" />
import type { Config, Definition, Settings } from "./type"
import Handler from "./Handler"
import PluginManager from "@azhulin/plugin-manager"

/**
 * The data handler manager.
 */
export default class Manager {

  /**
   * The handlers info.
   */
  public get info(): Record<string, { path: string }> {
    return this.pluginManager.info
  }

  /**
   * The plugin manager.
   */
  protected pluginManager: PluginManager

  /**
   * Constructor for the Manager object.
   */
  public constructor(path: string | string[] = [], dirname: string = "", match?: string | RegExp | (string | RegExp)[]) {
    this.pluginManager = new PluginManager(Handler)
      .register("handler", __dirname)
      .register(path, dirname, match)
  }

  /**
   * Returns a data handler for the specified data type or data definition.
   */
  public handler(definition: Definition): Handler
  public handler(type: string, config?: Config): Handler
  public handler(type: string | Definition, config?: Config): Handler {
    ({ type, ...config } = Handler.definitionNormalize(type, config))
    const { pluginManager } = this
    const settings: Settings = { config, pluginManager }
    return pluginManager.instance(type, settings)
  }

}
