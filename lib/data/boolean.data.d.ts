import * as Data from "..";
/**
 * The boolean data handler class.
 */
declare class BooleanHandler extends Data.Handler<boolean> {
    /**
     * {@inheritdoc}
     */
    get type(): string;
    /**
     * {@inheritdoc}
     */
    get typeName(): string;
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
}
/**
 * The boolean data handler namespace.
 */
export declare namespace $Boolean {
    type Config<T = boolean> = Data.Config<T>;
    const Handler: typeof BooleanHandler;
    const constraint: Data.Constraint.Library<any>;
    const preparer: Data.Processor.Library<unknown>;
    const processor: Data.Processor.Library<any>;
    function conf(config?: Config): Data.Definition;
    function init(config?: Config): BooleanHandler;
}
export {};
