import { ErrorData } from "../error"

/**
 * The expected data error.
 *
 * Error related to the data validation itself, e.g. invalid data type.
 */
export abstract class ErrorExpected extends ErrorData {}
