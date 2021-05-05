import * as Data from ".."

/**
 * The boolean data handler class.
 */
export default class Boolean extends Data.Handler {

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

export { Boolean as Handler }
