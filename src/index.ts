import express from 'express'
import { config } from 'dotenv'
import { PostgresGetUsersRepository } from './repositories/get-users/postgres-get-users'
import { GetUserController } from './controllers/get-users/get-users'
import { PostgresCreateUserRepository } from './repositories/create-users/postgres-create-user'
import { CreateUserController } from './controllers/create-users/create-user'
import { PostgresUpdateUserRepository } from './repositories/update-user/postgres-update-user'
import { PostgresGetUserByIdRepository } from './repositories/get-user-by-id/postgres-get-user-by-id'
import { UpdateUserController } from './controllers/update-user/update-user'

config()

const app = express()

app.use(express.json())

const port = process.env.PORT || 3333

app.get('/users', async(request, response) => {
    const postgresGetUsersRepository = new PostgresGetUsersRepository()

    const getUsersController = new GetUserController(postgresGetUsersRepository)
    
    const { body, statusCode } = await getUsersController.handle()

    response.status(statusCode).send(body)
})

app.post('/user', async(request, response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createUserController = new CreateUserController(postgresCreateUserRepository)

    const { body, statusCode } = await createUserController.handle({ body: request.body })

    response.status(statusCode).send(body)
 })

app.put('/user/:id', async(request, response) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const updateUserController = new UpdateUserController(postgresUpdateUserRepository, postgresGetUserByIdRepository)

    const { statusCode, body } = await updateUserController.handle({ params: request.params, body: request.body })

    response.status(statusCode).send(body)
})

app.listen(port, () => {
    console.log('App em execução.')
})
