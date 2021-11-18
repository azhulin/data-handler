import * as Data from ".."

export type Config = Data.Config

/**
 * The boolean data handler class.
 */
export class Handler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return "boolean" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Boolean" }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "boolean" === typeof data
  }

}

export function conf(config?: Config) { return { ...config, Handler } }
export function init(config?: Config) { return new Handler({ config }) }
