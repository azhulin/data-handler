import * as Data from "..";
/**
 * The boolean data handler class.
 */
declare class $ extends Data.Handler<boolean> {
    /**
     * {@inheritdoc}
     */
    static id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
    /**
     * {@inheritdoc}
     */
    type: string;
    /**
     * {@inheritdoc}
     */
    typeName: string;
    /**
     * {@inheritdoc}
     */
    protected isValidType(data: unknown): boolean;
}
/**
 * The boolean data handler namespace.
 */
export declare namespace $Boolean {
    type Config = Data.Config<boolean>;
    const Handler: typeof $;
    const id: string, constraint: Data.Constraint.Library<any>, preparer: Data.Processor.Library<unknown>, processor: Data.Processor.Library<any>;
    function conf(config?: Config): Data.Definition<any>;
    function init(config?: Config): Data.Handler<boolean, boolean, boolean>;
}
export {};
