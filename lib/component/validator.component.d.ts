import type { BaseContext, Context, Settings } from "../interface";
import type { Constraint, Default, Definition, Path, Preparer, Processor, Property } from "../type";
/**
 * The data validator class.
 */
export declare abstract class Validator<T extends any = any> {
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
    protected default: Default<T>;
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
    protected preparers: Preparer<T>[];
    /**
     * An array of data preprocessors.
     */
    protected preprocessors: Processor<NonNullable<T>>[];
    /**
     * An array of data constraints.
     */
    protected constraints: Constraint.List<NonNullable<T>>;
    /**
     * An array of data postprocessors.
     */
    protected postprocessors: Processor<NonNullable<T>>[];
    /**
     * Custom preparers, preprocessors, constraints, postprocessors.
     */
    protected custom: {
        preparers?: Preparer<T>[];
        preprocessors?: Processor<NonNullable<T>>[];
        constraints?: Constraint.List<NonNullable<T>>;
        postprocessors?: Processor<NonNullable<T>>[];
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
     * Constructor for the Handler object.
     */
    constructor({ config, path, source, result, storage, warnings }: Settings);
    /**
     * Resets the handler state.
     */
    protected reset(data: unknown): void;
    /**
     * Returns validated data.
     */
    validate(data: unknown, baseContext?: BaseContext): Promise<T>;
    /**
     * Returns the context.
     */
    protected getContext(context?: BaseContext): Promise<Context>;
    /**
     * Prepares the data.
     */
    protected prepare(data: unknown, context: Context): Promise<T>;
    /**
     * Determines whether the data is valid.
     */
    protected isValid(data: unknown): boolean;
    /**
     * Processes the data.
     */
    protected process(data: NonNullable<T>, context: Context): Promise<NonNullable<T>>;
    /**
     * Runs data preprocessors.
     */
    protected preprocess(data: NonNullable<T>, context: Context): Promise<NonNullable<T>>;
    /**
     * Runs data postprocessors.
     */
    protected postprocess(data: NonNullable<T>, context: Context): Promise<NonNullable<T>>;
    /**
     * Runs processors on the data.
     */
    protected run(type: "preprocessors" | "postprocessors", data: NonNullable<T>, context: Context): Promise<NonNullable<T>>;
    /**
     * Checks data constraints.
     */
    protected checkConstraints(data: NonNullable<T>, context: Context): Promise<void>;
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
    protected getDefault(context: Context, behavior?: keyof Default<T>): Promise<T>;
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
