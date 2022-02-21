import * as Data from "..";
import { $List, $Option } from ".";
export declare namespace $OptionList {
    type Config<T extends null | (number | string)[]> = Data.Config<T> & {
        key_type?: $Option.KeyType;
        options?: $Option.Options;
        preserve?: boolean;
    };
}
/**
 * The option list data handler class.
 */
export declare class $OptionList<T extends null | (number | string)[]> extends $List<T> {
    /**
     * {@inheritdoc}
     */
    protected constraints: Data.Constraint.List<NonNullable<T>>;
    /**
     * {@inheritdoc}
     */
    static processor: {
        order: <T_1 extends any[]>(data: T_1, { handler }: Data.Context) => T_1;
    };
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
    /**
     * Configures the data handler.
     */
    static conf(config?: $OptionList.Config<(number | string)[]>): Data.Definition;
    /**
     * Initializes the data handler.
     */
    static init<T extends null | (number | string)[] = (number | string)[]>(config?: $OptionList.Config<T>): $OptionList<T>;
}
