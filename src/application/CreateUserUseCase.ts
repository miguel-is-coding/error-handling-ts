import { UserRepository } from "../infra/database/UserRepository";
import { User } from "../domain/User";
import { CreateUserResult } from "./CreateUserResult";


export class CreateUserUseCase {

    private static readonly MAX_NUMBER_OF_ADMINS = 2
    constructor(private readonly userRepository: UserRepository) {}

    execute(user: User): CreateUserResult {
        if (this.userRepository.exists(user)) {
            return CreateUserResult.userAlreadyExists()
        }

        if (user.isAdmin() && this.cannotExistsMoreAdmins()) {
            return CreateUserResult.cannotCreateMoreAdmins()
        }

        return this.userRepository.save(user)
    }

    private cannotExistsMoreAdmins(): boolean {
        return this.userRepository.countOfAdmins() > CreateUserUseCase.MAX_NUMBER_OF_ADMINS
    }
}
