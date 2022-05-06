/**
 * The data property.
 *
 * The data property is a value of a certain type (static data property) or a
 * function (synchronous or asynchronous) that returns a value of a certain type
 * that depends on a context argument (dynamic data property).
 */
export type Property<P, C> = Property.Static<P> | Property.Dynamic<P, C>

/**
 * The data property namespace.
 */
export namespace Property {

  /**
   * The static data property.
   */
  export type Static<P> = P

  /**
   * The dynamic data property.
   */
  export type Dynamic<P, C> = (context: C) => P | Promise<P>

}
