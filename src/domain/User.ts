import {Result} from "../exercise2/Result";
import {AppError} from "../application/CreateUserResult";

export class User {
    public readonly username: string
    public readonly password: string
    public readonly role: UserRole

    private constructor(
        username: string,
        password: string,
        role: string
    ) {
        this.username = username
        this.password = password
        this.role = userRoleFrom(role)
    }
    isAdmin(): boolean {
        return this.role === UserRole.ADMIN
    }

    static from(
        username: string,
        password: string,
        role: string
    ): Result<User> {
        if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
            return Result.failure(AppError.UserDataIsMissing)
        }
        if (password.length < 8) {
            return Result.failure(AppError.UserPasswordTooShort)
        }
        return Result.success(new User(username, password, role))
    }
}

function isNullOrEmpty(value: string): boolean {
    return value === null || value === ''
}

export enum UserRole {
    ADMIN = 'admin',
    STANDARD = 'standard',
}

function userRoleFrom(role: string): UserRole {
    if (role === 'admin') {
        return UserRole.ADMIN
    }

    if (role === 'standard') {
        return UserRole.STANDARD
    }

    throw new Error('Invalid role')
}
