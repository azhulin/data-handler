/**
 * The data property.
 */
export type Property<P, C> = Property.Static<P> | Property.Dynamic<P, C>

export namespace Property {
  export type Static<P> = P
  export type Dynamic<P, C> = (context: C) => P | Promise<P>
}
