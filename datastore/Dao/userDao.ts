import { User } from "../../types";

export interface UserDeo{
    createUser(user:User):Promise<void>;
    getUserByEmail(email:String):Promise<User|undefined>;
    getUserByUsername(username:String):Promise<User|undefined>;
}