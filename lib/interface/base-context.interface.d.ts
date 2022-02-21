import type { Operation } from "../enum";
/**
 * The base data context.
 */
export interface BaseContext {
    operation?: Operation;
    data?: unknown;
    [key: string]: unknown;
}
