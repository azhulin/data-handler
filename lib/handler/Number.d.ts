import * as Data from "..";
export declare type Config = Data.Config & {
    span?: string;
    decimals?: number;
};
/**
 * The number data handler class.
 */
export default class NumberHandler extends Data.Handler {
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
     * Whether the number can be negative.
     */
    protected negative: boolean;
    /**
     * Whether the number can be zero.
     */
    protected zero: boolean;
    /**
     * Whether the number can be positive.
     */
    protected positive: boolean;
    /**
     * The number of decimal points.
     */
    protected decimals: number | null;
    /**
     * {@inheritdoc}
     */
    constructor(settings: Data.Settings);
    /**
     * {@inheritdoc}
     */
    protected isValid(data: unknown): boolean;
    /**
     * {@inheritdoc}
     */
    protected inputToBase(data: number, context: Data.Context): Promise<number>;
    /**
     * {@inheritdoc}
     */
    protected checkConstraint(constraint: string, data: number, context: Data.Context): Promise<Data.Constraint.Result>;
    /**
     * Return number type span prefix.
     */
    protected getSpanPrefix(): string;
}
export { NumberHandler as Handler };
