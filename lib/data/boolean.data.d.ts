import * as Data from "..";
/**
 * The boolean data handler class.
 */
declare class BooleanHandler extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    get id(): string;
    /**
     * {@inheritdoc}
     */
    get name(): string;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export declare namespace $Boolean {
    type Config<T = boolean> = Data.Config<T>;
    const Handler: typeof BooleanHandler;
    const constraint: Data.Constraint.Library<any>;
    const preparer: Data.Preparer.Library;
    const processor: Data.Processor.Library<any>;
    function conf(config?: Config): {
        Handler: typeof BooleanHandler;
        config: Config<boolean>;
    };
    function init(config?: Config): BooleanHandler;
}
export {};
