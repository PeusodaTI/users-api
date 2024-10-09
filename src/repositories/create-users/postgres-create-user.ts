import { prisma } from '../../config/database'
import { CreateUserParams, ICreateUserRepository } from '../../controllers/create-users/protocols'
import { User } from '../../models/user'

export class PostgresCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        try {
            const postgresDB = prisma

            const user = await postgresDB.user.create({
                data: {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    email: params.email,
                    password: params.password
                }
            })

            return user
        } catch (error) {
            throw new Error('Erro ao criar usuário')
        }
    }

}