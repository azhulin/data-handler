import * as Data from "..";
import * as List from "./List";
import * as Option from "./Option";
export declare type Config = Option.Config & {
    preserve?: boolean;
};
/**
 * The option list data handler class.
 */
export default class OptionList extends List.Handler {
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
    protected options: Option.Options;
    /**
     * Whether to keep the items order from the input.
     */
    protected preserve: boolean;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
}
export { OptionList as Handler };
