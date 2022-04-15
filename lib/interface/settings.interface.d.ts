import type { Path } from "../type";
/**
 * The data handler settings.
 */
export interface Settings {
    path?: Path;
    storage?: Record<string, unknown>;
    source?: unknown;
    result?: unknown;
    warnings?: Error[];
}
