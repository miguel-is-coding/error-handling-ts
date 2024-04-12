import {Result} from "../exercise2/Result";
import {User} from "../domain/User";
import {AppError} from "../application/CreateUserResult";

describe('User should', () => {
    test('be created successfully', () => {
        const user: Result<User> = User.from("Roberto", "123456789", "standard")

        expect(user.isSuccess()).toBe(true)
        expect(user.value()).toBeInstanceOf(User)
    })

    test('build a failure result when there is no username', () => {
        const user: Result<User> = User.from("", "123456789", "standard")

        expect(user.isSuccess()).toBe(false)
        expect(user.error()).toBe(AppError.UserDataIsMissing)
    })

    test('build a failure result when there is no password', () => {
        const user: Result<User> = User.from("Miguel", "", "standard")

        expect(user.isSuccess()).toBe(false)
        expect(user.error()).toBe(AppError.UserDataIsMissing)
    })

    test('build a failure result when the password is shorter than the minimum required', () => {
        const user: Result<User> = User.from("Miguel", "1234", "standard")

        expect(user.isSuccess()).toBe(false)
        expect(user.error()).toBe(AppError.UserPasswordTooShort)
    })

    test('build a failure result when the role is invalid', () => {
        const user: Result<User> = User.from("Miguel", "123456789", "sneaky")

        expect(user.isSuccess()).toBe(false)
        expect(user.error()).toBe(AppError.InvalidRole)
    })
})
