import { User } from "../../types";

export interface UserDeo{

    createUser(user:User):Promise<void>;
    getUserById(id:String):Promise<User|undefined>;
    getUserByEmail(email:String):Promise<User|undefined>;
    checkAvailabilityOfEmail(email:string):Promise<string|undefined>;
    // getUserByUsername(username:String):Promise<User|undefined>;
}