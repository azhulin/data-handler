import type { Context } from "../interface"

/**
 * Constraint component.
 */
export class Constraint<T> {

  /**
   * Constructor for the Constraint object.
   */
  public constructor(
    public readonly id: string,
    public readonly func: Constraint.Func<T>,
    public skip: boolean = false,
  ) {}

  /**
   * Sets skip on update flag.
   */
  public skipOnUpdate(skip: boolean = true): Constraint<T> {
    return new Constraint<T>(this.id, this.func, skip)
  }

}

export namespace Constraint {
  export type Result = null | string | [string, Record<string, unknown>]
  export type Func<T> = (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>
  export type Library = {
    [key: string]: Constraint<any> | ((...args: any) => Constraint<any>) | Library
  }
  export type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>
}