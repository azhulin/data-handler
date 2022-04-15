import { Constraint } from "../component"

/**
 * Generates an inequality constraints.
 */
export function inequalityConstraints<T>(id: string, count: (data: T) => number, prefix: string, suffix?: string) {
  suffix = suffix ? ` ${suffix}` : ""
  return {
    eq: (value: number) => new Constraint<T>(
      `${id}=${value}`,
      data => count(data) === value ? null : `${prefix} should be equal to ${value}${suffix}.`,
    ),
    gt: (value: number) => new Constraint<T>(
      `${id}>${value}`,
      data => count(data) > value ? null : `${prefix} should be greater than ${value}${suffix}.`,
    ),
    gte: (value: number) => new Constraint<T>(
      `${id}>=${value}`,
      data => count(data) >= value ? null : `${prefix} should be greater than or equal to ${value}${suffix}.`,
    ),
    lt: (value: number) => new Constraint<T>(
      `${id}<${value}`,
      data => count(data) < value ? null : `${prefix} should be lesser than ${value}${suffix}.`,
    ),
    lte: (value: number) => new Constraint<T>(
      `${id}<=${value}`,
      data => count(data) <= value ? null : `${prefix} should be lesser than or equal to ${value}${suffix}.`,
    ),
    neq: (value: number) => new Constraint<T>(
      `${id}<>${value}`,
      data => count(data) !== value ? null : `${prefix} should not be equal to ${value}${suffix}.`,
    ),
  }
}
