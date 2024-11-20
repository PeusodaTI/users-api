import { prisma } from '../../config/database'
import { IGetUserByIdRepository } from '../../controllers/update-user/protocols'
import { User } from '../../models/user'

export class PostgresGetUserByIdRepository implements IGetUserByIdRepository {
    async getUserById(id: string): Promise<User> {
        try {
            const postgresDB = prisma

            const user = await postgresDB.user.findUnique({
                where: { id }
            })

            if (!user) {
                throw new Error('Usuário não encontrado.')
            }

            return user

        } catch (error) {
            throw new Error('Internal Server Error')
        }
    }

}