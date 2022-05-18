/**
 * The relative data field.
 *
 * The relative data field describes how to modify a data path array, taking off
 * and/or appending elements to it. The relative data field consists of two
 * parts: a prefix, and a data field. Both parts are optional. The prefix part
 * is a spacing circumflex accent symbol (`^`), optionally followed by a number
 * (1 if omitted). This number indicates how many elements to take off from the
 * end of a data path array. The data field part indicates what elements to
 * append to the data path array.
 *
 * @see Field
 *
 * @example
 *   Data: { a: { x: 1, y: 2 } }
 *   Current path: ["a", "y"]
 *   Current value: 2
 *   Relative field: "^.x"
 *   Resolved path: ["a", "x"]
 *   Resolved value: 1
 *
 * @example
 *   Data: { a: { b: [{ x: 1 }, { y: 2 }, { z: 3 }], c: [false, true] } }
 *   Current path: ["a", "b", 1, "y"]
 *   Current value: 2
 *   Relative field: "^3.c[1]"
 *   Resolved path: ["a", "c", 1]
 *   Resolved value: true
 */
export declare type FieldRelative = string;
