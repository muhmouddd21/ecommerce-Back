import { User } from "../../types";

export interface UserDeo{

    createUser(user:User):Promise<void>;
    getUserById(id:String):Promise<User|undefined>;
    getUserByEmail(email:String):Promise<User|undefined>;
    checkAvailabilityOfEmail(email:string):Promise<string|undefined>;
    getUserByRefreshToken(refreshToken:string):Promise<User|undefined>;
    storeRefreshToken(refreshToken:string,userId:string):Promise<void>;
}