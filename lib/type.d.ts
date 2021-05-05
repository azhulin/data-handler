export * from "@azhulin/data-validator/lib/type";
import { Config as BaseConfig, Context, Definition as BaseDefinition, Property, Settings as BaseSettings } from "@azhulin/data-validator/lib/type";
export declare type Format = import("./Format").default;
export declare type Config = BaseConfig & {
    store?: Property<boolean, Context>;
    output?: Property<boolean, Context>;
};
export declare type Definition = BaseDefinition & Config;
export declare type Settings = BaseSettings & {
    config: Config;
};
