import * as Data from ".."
import { $Number } from "."

export type Config = Data.Config

/**
 * The integer data handler class.
 */
export class Handler extends $Number.Handler {

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
  public get description(): string { return }

  /**
   * {@inheritdoc}
   */
  protected decimals: number | null = 0

  /**
   * {@inheritdoc}
   */
  protected isValid(data: unknown): boolean {
    return super.isValid(data) && Number.isInteger(data)
  }

}

export function conf(config?: Config) { return { ...config, Handler } }
export function init(config?: Config) { return new Handler({ config }) }
