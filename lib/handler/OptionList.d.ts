import * as Data from "..";
import * as $List from "./List";
import * as $Option from "./Option";
export declare type Config = $Option.Config & {
    preserve?: boolean;
};
/**
 * The option list data handler class.
 */
export declare class Handler extends $List.Handler {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint[];
    /**
     * {@inheritdoc}
     */
    protected processorLibrary: Data.Processor.Library;
    /**
     * The options.
     */
    protected options: $Option.Options;
    /**
     * Whether to keep the items order from the input.
     */
    protected preserve: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
}
export declare function conf(config?: Config): {
    input?: Data.Property<boolean, Data.Context>;
    require?: Data.Property<boolean, Data.Context>;
    default?: Partial<Data.Default>;
    preprocessors?: Data.Processor[];
    constraints?: Data.Constraint[];
    postprocessors?: Data.Processor[];
    store?: Data.Property<boolean, Data.Context>;
    output?: Data.Property<boolean, Data.Context>;
    key_type?: import("@azhulin/data-validator/lib/handler/Option").KeyType;
    options?: $Option.Options;
    preserve?: boolean;
    Handler: typeof Handler;
};
export declare function init(config?: Config): Handler;
