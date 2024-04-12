import { AppError } from "../application/CreateUserResult";

export abstract class Result<T> {
    protected constructor(
        protected _value: T | null,
        protected _error: AppError | null
    ) {}

    isSuccess(): boolean {
        return this instanceof Success
    }

    value(): T | null {
        return null
    }
    error(): AppError | null {
        return null
    }

    static success<T>(value: T) {
        return Success.create(value)
    }

    static failure<T>(error: AppError) {
        return Failure.create(error)
    }
}

export class Success<T> extends Result<T> {
    private constructor(_value: T) {
        super(_value, null)
    }

    value(): T {
        return this._value!;
    }

    static create<T>(value: T) {
        return new Success(value)
    }
}

export class Failure extends Result<null> {
    private constructor(_error: AppError) {
        super(null, _error)
    }

    error(): AppError {
        return this._error!
    }

    static create(value: AppError) {
        return new Failure(value)
    }
}
