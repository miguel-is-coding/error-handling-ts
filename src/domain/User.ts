import { EmptyDataNotAllowedError, PasswordTooShortError } from "../application/Errors";

export class User {
    private constructor(
        readonly username: string,
        readonly password: string,
        readonly role: UserRole
    ) {}

    static from(username: string, password: string, role: string): User {
        if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
            throw new EmptyDataNotAllowedError()
        }
        if (password.length < 8) {
            throw new PasswordTooShortError()
        }
        return new User(username, password, userRoleFrom(role))
    }

    isAdmin(): boolean {
        return this.role === UserRole.ADMIN
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
