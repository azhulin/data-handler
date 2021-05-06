export * from "@azhulin/data-validator/lib/type"

import {
  Config as BaseConfig,
  Context,
  Definition as BaseDefinition,
  Property,
  Settings as BaseSettings,
} from "@azhulin/data-validator/lib/type"

export type Format = import("./Format").default

export type Config = BaseConfig & {
  store?: Property<boolean, Context>
  output?: Property<boolean, Context>
}

export type Definition = BaseDefinition & Config

export type Settings = BaseSettings & {
  config?: Config
}
