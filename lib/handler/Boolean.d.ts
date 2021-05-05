import * as Data from "..";
/**
 * The boolean data handler class.
 */
export default class Boolean extends Data.Handler {
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
    protected default: Data.Default;
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
}
export { Boolean as Handler };
