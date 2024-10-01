import { IGetUserRepository } from '../../controllers/get-users/protocols'
import { User } from '../../models/user'

export class PostgresGetUsersRepository implements IGetUserRepository {
    async getUser(): Promise<User[]> {
        return [
            {
                firstName: 'Pedro',
                lastName: 'Henrique',
                email: 'pedro.henrique@email.com',
                password: 'testPostgres',
            }
        ]
    }

}