import { User } from "../../domain/User";
import { CreateUserResult } from "../../application/CreateUserResult";

export class UserRepository {
    private readonly users: Array<User> = []
    exists(user: User): boolean {
        return this.users.find(u => u.username === user.username) !== undefined
    }

    countOfAdmins(): number {
        return this.users.filter(u => u.isAdmin()).length
    }

    save(user: User): CreateUserResult {
        try {
            this.users.push(user)
            return CreateUserResult.success()
        } catch (error) {
            return CreateUserResult.cannotSaveUser()
        }
    }
}
