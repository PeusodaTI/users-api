import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from './protocols'

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Por favor, envie dados no body da requisição.'
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body)

            return {
                statusCode: 201,
                body: user
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Internal Server Error.'
            }
        }
    }

}