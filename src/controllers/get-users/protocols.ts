import { User } from "../../models/user"

export interface IGetUserController {
    handle(): any
}

export interface IGetUserRepository {
    getUser(): Promise<User[]>
}