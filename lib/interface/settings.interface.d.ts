import type { ErrorExpected } from "../error";
import type { Path } from "../type";
/**
 * The data settings.
 *
 * The data settings is an object that is used to initialize the dependent data
 * handler, passing the data path and shared settings from the host data handler
 * to the dependend data handler. For example, the `Object` data handler
 * initializes the dependent data handlers described in its schema.
 *
 * @see Validator#constructor
 */
export interface Settings {
    /**
     * The data path.
     *
     * @see Validator#path
     */
    path: Path;
    /**
     * The data warnings.
     *
     * @see Validator#warnings
     */
    warnings: ErrorExpected[];
    /**
     * The data storage.
     *
     * @see Validator#storage
     */
    storage: Record<string, unknown>;
    /**
     * The source data.
     *
     * @see Validator#source
     */
    source: unknown;
    /**
     * The result data.
     *
     * @see Validator#result
     */
    result: unknown;
}
