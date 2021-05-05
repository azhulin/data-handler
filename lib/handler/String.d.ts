import * as Data from "..";
/**
 * The string data handler class.
 */
export default class String extends Data.Handler {
    /**
     * {@inheritdoc}
     */
    id: string;
    /**
     * {@inheritdoc}
     */
    name: string;
    /**
     * {@inheritdoc}
     */
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * {@inheritdoc}
     */
    protected processorLibrary: Data.Processor.Library;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: string, context: Data.Context): Promise<string>;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: string, context: Data.Context): Promise<Data.Constraint.Result>;
}
export { String as Handler };
