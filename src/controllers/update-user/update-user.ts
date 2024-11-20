import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'
import { IGetUserByIdRepository, IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from './protocols'

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository, private readonly getUserByIdRepository: IGetUserByIdRepository) {}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest.params.id

            if (!id) {
                throw new Error('O campo id é obrigatório.')        
            }

            const user = await this.getUserByIdRepository.getUserById(id)

            const params: UpdateUserParams = {
                firstName: httpRequest.body.firstName ? httpRequest.body.firstName : user.firstName,
                lastName: httpRequest.body.lastName ? httpRequest.body.lastName : user.lastName,
                password: httpRequest.body.password ? httpRequest.body.password : user.password
            }

            const userUpdate = await this.updateUserRepository.updateUser(id, params)

            return {
                statusCode: 200,
                body: userUpdate
            }
        } catch (error) {
            return {
                statusCode: 400,
                body: 'Erro ao tentar atualizar usuário.'
            }
        }
    }

}