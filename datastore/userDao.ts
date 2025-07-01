import { User } from "../types";

export interface UserDeo{
    createUser(user:User):void;
    getUserByEmail(email:String):User|undefined;
    getUserByUsername(username:String):User|undefined;
}