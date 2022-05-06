/**
 * The data path.
 *
 * The data path is an array of numbers (for array indexes) and strings (for
 * object keys) that represents the position of the data value in array or
 * object.
 *
 * @example
 *   Data: { a: { b: [{ x: 1 }, { y: 2 }, { z: 3 }] } }
 *   Path: ["a", "b", 1, "y"]
 *   Value: 2
 *
 * @example
 *   Data: [{ x: 1 }, { y: 2 }, { z: 3 }]
 *   Path: [2, "z"]
 *   Value: 3
 */
export type Path = Array<number | string>
