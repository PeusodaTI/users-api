import { prisma } from '../../config/database'
import { IUpdateUserRepository, UpdateUserParams } from '../../controllers/update-user/protocols'
import { User } from '../../models/user'

export class PostgresUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: UpdateUserParams): Promise<User> {
        try {
            const postgresDB = prisma

            const user = await postgresDB.user.findUnique({
                where: {
                    id
                }
            })
    
            if (!user) {
                throw new Error('Usuário não encontrado.')
            }
    
            const userUpdate = await postgresDB.user.update({
                where: {
                    id
                },
                data: {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    password: params.password
                }
            })
    
            return userUpdate
        } catch (error) {
            throw new Error('Internal Server Error.')
        }     
    }
}