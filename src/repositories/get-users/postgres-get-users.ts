import { prisma } from '../../config/database'
import { IGetUserRepository } from '../../controllers/get-users/protocols'
import { User } from '../../models/user'

export class PostgresGetUsersRepository implements IGetUserRepository {
    async getUser(): Promise<User[]> {
        const postgresDB = prisma

        const users = await postgresDB.user.findMany()
        
        return users
    }

}