/**
 * The data format.
 *
 * Describes the format of the data. The data can be converted from one data
 * format into another.
 * For example, the data validation can be described as a converting the data
 * from the `input` data format into the `base` data format, and reading the
 * data from a storage can be described as a converting the data from the
 * `store` data format into the `base` data format.
 * Possible data format transitions:
 * - Validate - from the `input` data format into the `base` data format;
 * - Store - from the `base` data format into the `store` data format;
 * - Read - from the `store` data format into the `base` data format;
 * - Output - from the `base` data format into the `output` data format.
 */
export enum Format {

  /**
   * The input data format.
   *
   * The data in the `input` data format is a raw unvalidated data. The data in
   * this format can be converted into the `base` data format (validated).
   */
  input = "input",

  /**
   * The base data format.
   *
   * The data in the `base` data format is the validated complete data. The data
   * in this format can be converted into the `store` and `output` data formats.
   */
  base = "base",

  /**
   * The store data format.
   *
   * The data in the `store` data format is the data read from the storage or
   * the data prepared for the write to the storage. The data in this format can
   * be converted into the `base` data format.
   */
  store = "store",

  /**
   * The output data format.
   *
   * The data in the `output` data format is the data prepared for the output.
   * When converting to this format some confidential data can be removed, or
   * some extra data can be added. The data can not be converted from this
   * format.
   */
  output = "output",

}
