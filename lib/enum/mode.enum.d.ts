/**
 * The data mode.
 *
 * Determines the behavior of the data validation. For example, omitting the
 * required field value in `create` data mode causes an error, but in `update`
 * data mode the omitted value is populated from the provided original data.
 *
 * @see Options
 */
export declare enum Mode {
    /**
     * The create data mode.
     *
     * Complete data must be provided for validation. The default data mode.
     */
    create = "create",
    /**
     * The update data mode.
     *
     * Allows to provide only the data that must be updated instead of providing
     * the complete data. When using this data mode, the original data must be
     * provided in data options under the `data` key. The missing data will be
     * populated from the provided original data.
     */
    update = "update"
}
