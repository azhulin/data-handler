import * as Data from "..";
/**
 * The timestamp data handler class.
 */
export default class Timestamp extends Data.Handler {
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
    get description(): string;
    /**
     * {@inheritdoc}
     */
    protected constraintLibrary: Data.Constraint.Library;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export { Timestamp as Handler };
