/**
 * The data property.
 */
export declare type Property<P, C> = Property.Static<P> | Property.Dynamic<P, C>;
export declare namespace Property {
    type Static<P> = P;
    type Dynamic<P, C> = (context: C) => P | Promise<P>;
}
