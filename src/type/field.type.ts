/**
 * The data field.
 *
 * The data field is a string representation of a data path. The object keys in
 * the data path are prefixed with a dot symbol (`.`), and array indexes are
 * wrapped with square brackets symbols (`[`, `]`).
 *
 * @see Path
 *
 * @example
 *   Path: ["a", "b", 1, "y"]
 *   Field: ".a.b[1].y"
 *
 * @example
 *   Path: [2, "z"]
 *   Field: "[2].z"
 */
export type Field = string
