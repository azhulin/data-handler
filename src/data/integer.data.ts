import * as Data from ".."
import { $Number } from "."

export namespace $Integer {
  export type Config<T extends null | number> = Data.Config<T>
}

/**
 * The integer data handler class.
 */
export class $Integer<T extends null | number> extends $Number<T> {

  /**
   * {@inheritdoc}
   */
  public get id(): string { return super.id + ".integer" }

  /**
   * {@inheritdoc}
   */
  public get name(): string { return "Integer" }

  /**
   * {@inheritdoc}
   */
  public get description(): string { return "" }

  /**
   * {@inheritdoc}
   */
  protected decimals: null | number = 0

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return super.isValid(data) && Number.isInteger(data)
  }

  /**
   * Configures the data handler.
   */
  public static conf(config?: $Integer.Config<number>): Data.Definition {
    return [$Integer, config]
  }

  /**
   * Initializes the data handler.
   */
  public static init<T extends null | number = number>(config?: $Integer.Config<T>): $Integer<T> {
    return new $Integer<T>({ config })
  }

}
