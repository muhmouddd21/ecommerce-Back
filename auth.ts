import { jwtObject } from "./types";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export function signJWT(obj:jwtObject){
    const secretkey =getjwtSecretKey();
    return jwt.sign(obj,secretkey,{expiresIn: '1h'});

}
export function verifyJWT(token:string): jwtObject{
    return jwt.verify(token,getjwtSecretKey()) as jwtObject;
}

function getjwtSecretKey():string{
    const secretKey =process.env.JWTSECRETKEY;
    if(!secretKey){
        console.error("missing jwt secretKey")
        process.exit(1)
    }
    return secretKey
}