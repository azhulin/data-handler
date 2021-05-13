import * as Data from ".."

export type Config = Data.Config

/**
 * The boolean data handler class.
 */
export class Handler extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public id: string = "boolean"

  /**
   * {@inheritdoc}
   */
  public name: string = "Boolean"

  /**
   * {@inheritdoc}
   */
  protected default: Data.Default = {
    ...this.default,
    value: this.default.value ?? false,
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return "boolean" === typeof data
  }

}

export function conf(config?: Config) { return { Handler, ...config } }
export function init(config?: Config) { return new Handler({ config }) }
