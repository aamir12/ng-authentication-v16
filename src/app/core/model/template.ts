export interface ResponseHelper<T> {
    status: boolean;
    statusCode: number;
    data: T;
    error?: string | string[]
}
