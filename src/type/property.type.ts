import type { Context } from "../interface"

/**
 * The data property.
 *
 * The data property is a value of a certain type (static data property) or a
 * synchronous or asynchronous function that returns a value of a certain type
 * that depends on a data context argument (dynamic data property).
 */
export type Property<P> = Property.Static<P> | Property.Dynamic<P>

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
  export type Dynamic<P> = (context: Context) => P | Promise<P>

}
