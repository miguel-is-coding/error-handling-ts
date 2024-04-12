import { Result } from "./Result";
import { AppError } from "../application/CreateUserResult";

describe('Result should', () => {
    test('build a success result', () => {
        const result = Result.success("value")
        expect(result.isSuccess()).toBe(true)
        expect(result.value()).toBe("value")
    })

    test('build a failure result', () => {
        const result = Result.failure(AppError.UserAlreadyExists)
        expect(result.isSuccess()).toBe(false)
        expect(result.error()).toBe(AppError.UserAlreadyExists)
    })
})
