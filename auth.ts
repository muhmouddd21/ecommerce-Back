import { jwtObject } from "./types";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export function signJWT(obj:jwtObject){
    const secretkey =getjwtSecretKey();
    return jwt.sign(obj,secretkey,{expiresIn: '15m'});

}
export function signRefreshToken(obj:jwtObject){
    const secretRefreshKey = getRefreshToken();
    return jwt.sign(obj,secretRefreshKey,{expiresIn: '14d'});
}
export function verifyJWT(token:string): jwtObject{
    return jwt.verify(token,getjwtSecretKey()) as jwtObject;
}
export function verifyRefreshToken(token:string): jwtObject{
    return jwt.verify(token,getRefreshToken()) as jwtObject
}
function getjwtSecretKey():string{
    const secretKey =process.env.JWTSECRETKEY;
    if(!secretKey){
        console.error("missing jwt secretKey")
        process.exit(1)
    }
    return secretKey
}

function getRefreshToken():string{
    const secretKey =process.env.REFRESHTOKENKEY;
    if(!secretKey){
        console.error("missing refresh Token secretKey")
        process.exit(1)
    }
    return secretKey
}
