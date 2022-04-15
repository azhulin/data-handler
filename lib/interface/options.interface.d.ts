import type { Operation } from "../enum";
/**
 * The data options.
 */
export interface Options {
    operation?: Operation;
    data?: unknown;
    [key: string]: unknown;
}
