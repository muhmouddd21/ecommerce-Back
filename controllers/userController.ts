import * as crypto from 'crypto';
import { signInRequest, signInResponse, signUpRequest, signUpResponse } from "../api";
import { DB } from "../datastore";
import { ExpressHandler, jwtObject, User, withError } from "../types";
import { signJWT } from '../auth';
import bcrypt from 'bcrypt';
const saltRounds = 10;
export const signupHandler:ExpressHandler<signUpRequest,withError<signUpResponse>> = async(req,res)=>{
    const {email,firstName,lastName,password} = req.body;

    if(!email || !firstName || !lastName || !password){
         res.status(400).send({error:"All fields required"});
         return;
    }

    const existing = await DB.getUserByEmail(email);

    if(existing){
         res.status(400).send({error:"user already exists"});
         return;
    }
     // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const user:User={
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        password: hashedPassword,
    }
    await DB.createUser(user);

     const jwt =signJWT({userId:user.id});

     res.sendStatus(200).send({jwt});
     return;
}

export const signinHandler:ExpressHandler<signInRequest,withError<signInResponse>> =async (req,res)=>{
     const {login,password} = req.body;

    if(!login || !password){
         res.sendStatus(400);
         return;
    }

     const existing = await DB.getUserByEmail(login);

      if(!existing ||  !(await bcrypt.compare(password, existing.password))){
         res.sendStatus(400).send({error:"wrong credintals"});
         return;
    }
    const jwt =signJWT({userId:existing.id});
     res.status(200).send({
          user:{  
               email:existing.email,
               firstName:existing.firstName,
               lastName:existing.lastName,
               id:existing.id,
          },
          jwt
   
    })
    return;

}