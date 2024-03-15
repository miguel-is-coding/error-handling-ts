import Express from 'express'
import { UserController } from "./http/UserController"
import { CreateUserUseCase } from "../application/CreateUserUseCase"
import { UserRepository } from "./database/UserRepository"

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const userController = new UserController(createUserUseCase)

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.post('/users', (req, res) => {
    return userController.execute(req, res)
})

export default app
