/**
 * The relative data field.
 *
 * The relative data field is a data field optionally prefixed with a spacing
 * circumflex accent symbol (`^`), optionally followed by a number. The symbol
 * indicates to move up in the data tree from the current data path, and the
 * number after the symbol indicates how many levels to move up in the data
 * tree. This process is equal to removing the last element from the current
 * path array number times. If the number after the symbol is omitted, the
 * number of levels to move up in the data tree is 1. After this the relative
 * data field without a prefix is converted into the data path and is appended
 * to the modified current path array.
 * See {@link Field}.
 *
 * @example
 *   Data: { a: { x: 1, y: 2 } }
 *   Current path: ["a", "y"]
 *   Current value: 2
 *   Relative field: "^.x"
 *   Path: ["a", "x"]
 *   Value: 1
 *
 * @example
 *   Data: { a: { b: [{ x: 1 }, { y: 2 }, { z: 3 }], c: [false, true] } }
 *   Current path: ["a", "b", 1, "y"]
 *   Current value: 2
 *   Relative field: "^3.c[1]"
 *   Path: ["a", "c", 1]
 *   Value: true
 */
export type FieldRelative = string
