import { IGetUserController, IGetUserRepository } from './protocols'

export class GetUserController implements IGetUserController{
    constructor(private readonly getUserRepository: IGetUserRepository) {}

    async handle() {
       //validar requisição
       //direcionar chamada para o Repository
        try {
           const users = await this.getUserRepository.getUser()

            return {
                statusCode: 200,
                body: users,        
           }
        } catch (error) {
            return {
                statusCode: 500,
                body: `Internal Server Error.`
            }
        }
    }

}