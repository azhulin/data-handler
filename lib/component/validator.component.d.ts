import { Constraint } from "../component";
import type { BaseContext, Context, Settings } from "../interface";
import type { Default, Definition, Path, Preparer, Processor, Property } from "../type";
/**
 * The data validator class.
 */
export declare abstract class Validator {
    /**
     * The ID of the data type.
     */
    abstract get id(): string;
    /**
     * The name of the data type.
     */
    abstract get name(): string;
    /**
     * The description of the data type.
     */
    get description(): string;
    /**
     * The label of the data handler.
     */
    get label(): string;
    /**
     * A map of available data preparers.
     */
    static preparer: Preparer.Library;
    /**
     * A map of available data processors.
     */
    static processor: Processor.Library;
    /**
     * A map of available data constraints.
     */
    static constraint: Constraint.Library;
    /**
     * The default data.
     */
    protected default: Default;
    /**
     * Whether to accept the data from input.
     */
    protected input: Property<boolean, Context>;
    /**
     * Whether the data is required.
     */
    protected require: Property<boolean, Context>;
    /**
     * An array of data preparers.
     */
    protected preparers: Preparer<any>[];
    /**
     * An array of data preprocessors.
     */
    protected preprocessors: Processor<any>[];
    /**
     * An array of data constraints.
     */
    protected constraints: Constraint.List<any>;
    /**
     * An array of data postprocessors.
     */
    protected postprocessors: Processor<any>[];
    /**
     * Custom preparers, preprocessors, constraints, postprocessors.
     */
    protected custom: {
        preparers?: Preparer<any>[];
        preprocessors?: Processor<any>[];
        constraints?: Constraint.List<any>;
        postprocessors?: Processor<any>[];
    };
    /**
     * The path of the data in the data tree.
     */
    protected path: Path;
    /**
     * Source data.
     */
    protected source: unknown;
    /**
     * Currently processed data.
     */
    protected result: unknown;
    /**
     * Intermediate data storage.
     */
    protected storage: Record<string, unknown>;
    /**
     * An array of collected during data handling warnings.
     */
    warnings: Error[];
    /**
     * Constructor for the Validator object.
     */
    constructor({ config, path, source, result, storage, warnings }: Settings);
    /**
     * Resets the handler state.
     */
    protected reset(data: unknown): void;
    /**
     * Returns validated data.
     */
    validate(data: unknown, baseContext?: BaseContext): Promise<unknown>;
    /**
     * Returns the context.
     */
    protected getContext(context?: BaseContext): Promise<Context>;
    /**
     * Prepares the data.
     */
    protected prepare(data: unknown, context: Context): Promise<unknown>;
    /**
     * Determines whether the data is valid.
     */
    protected isValid(data: unknown): boolean;
    /**
     * Processes the data.
     */
    protected process(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs data preprocessors.
     */
    protected preprocess(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs data postprocessors.
     */
    protected postprocess(data: unknown, context: Context): Promise<unknown>;
    /**
     * Runs processors on the data.
     */
    protected run(type: "preprocessors" | "postprocessors", data: unknown, context: Context): Promise<unknown>;
    /**
     * Checks data constraints.
     */
    protected checkConstraints(data: unknown, context: Context): Promise<void>;
    /**
     * Determines whether the value is present in source data.
     */
    protected inSource(): boolean;
    /**
     * Determines whether this is a root data handler.
     */
    protected isRoot(): boolean;
    /**
     * Determines whether the data was not provided.
     */
    protected isOmitted(data: unknown): boolean;
    /**
     * Determines whether the data is empty.
     */
    protected isEmpty(data: unknown): boolean;
    /**
     * Returns "input" flag value.
     */
    protected isInputable(context: Context): Promise<boolean>;
    /**
     * Returns "require" flag value.
     */
    protected isRequired(context: Context): Promise<boolean>;
    /**
     * Returns the default value based on behavior.
     */
    protected getDefault(context: Context, behavior?: keyof Default): Promise<unknown>;
    /**
     * Returns data handler dynamic context property value.
     */
    protected getProperty<P = unknown>(key: string, context: Context): Promise<P>;
    /**
     * Returns dynamic context property value.
     */
    protected getValue<P = unknown, C = Context>(property: Property<P, C>, context: C): Promise<P>;
    /**
     * Returns the data handler for specified data definition.
     */
    protected initHandler(definition: Definition, path: Path): Validator;
    /**
     * Adds a warning.
     */
    protected warn(error: Error): void;
}
