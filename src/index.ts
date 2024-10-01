import express from 'express'
import { config } from 'dotenv'
import { PostgresGetUsersRepository } from './repositories/get-users/postgres-get-users'
import { GetUserController } from './controllers/get-users/get-users'

config()

const app = express()

const port = process.env.PORT || 3333

app.get('/users', async(request, response) => {
    const postgresGetUsersRepository = new PostgresGetUsersRepository()

    const getUsersController = new GetUserController(postgresGetUsersRepository)
    
    const { body, statusCode } = await getUsersController.handle()

    response.status(statusCode).send(body)
})

app.listen(port, () => {
    console.log('App em execução.')
})
