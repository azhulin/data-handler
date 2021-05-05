import * as Data from ".."

/**
 * The timestamp data handler class.
 */
export default class Timestamp extends Data.Handler {

  /**
   * {@inheritdoc}
   */
  public id: string = "number.timestamp"

  /**
   * {@inheritdoc}
   */
  public name: string = "Timestamp"

  /**
   * {@inheritdoc}
   */
  public get description(): string { return `e.g. ${+new Date()}` }

  /**
   * {@inheritdoc}
   */
  protected constraintLibrary: Data.Constraint.Library = {
    ...this.constraintLibrary,
    ">now": (data: number) =>
      data > +new Date() ? null : "Future date expected.",
    "<now": (data: number) =>
      data < +new Date() ? null : "Past date expected.",
  }

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return Data.Util.isIndex(data)
  }

}

export { Timestamp as Handler }
