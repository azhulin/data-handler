import * as Data from "..";
import { $List, $Option } from ".";
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
    Handler: typeof Data.$OptionList.Handler;
    store?: Data.Property<boolean, Data.Context> | undefined;
    output?: Data.Property<boolean, Data.Context> | undefined;
    input?: Data.Property<boolean, Data.Context> | undefined;
    require?: Data.Property<boolean, Data.Context> | undefined;
    default?: Partial<Data.Default> | undefined;
    preprocessors?: Data.Processor[] | undefined;
    constraints?: Data.Constraint[] | undefined;
    postprocessors?: Data.Processor[] | undefined;
    key_type?: $Option.KeyType | undefined;
    options?: $Option.Options | undefined;
    preserve?: boolean | undefined;
};
export declare function init(config?: Config): Data.$OptionList.Handler;
