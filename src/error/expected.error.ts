import { ErrorData } from "../error"

/**
 * The expected data error.
 *
 * Error related to the data validation itself. For example, invalid data type.
 */
export abstract class ErrorExpected extends ErrorData {}
