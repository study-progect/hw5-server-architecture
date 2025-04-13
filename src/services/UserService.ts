import {User} from "../model/userTypes.js";

export interface UserService {
    addUser(user:User):boolean;
    //TODO methods signatures
    getUserIndex(userId: number):number
    getUser(userId: number):User|null
    removeUser(userId:number):User|null
    updateUser (newUserData:User):boolean
    getAllUsers():User[]
}