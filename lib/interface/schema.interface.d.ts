import type { Definition } from ".";
/**
 * The data schema.
 *
 * The data schema is used to describe object data definition.
 */
export interface Schema {
    [key: string]: Definition;
}
