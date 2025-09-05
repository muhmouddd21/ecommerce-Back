import * as crypto from 'crypto';
import { signInRequest, signInResponse, signUpRequest, signUpResponse } from "../api";
import { DB } from "../datastore";
import { ExpressHandler, jwtObject, User, withError } from "../types";
import { signJWT, signRefreshToken, verifyJWT, verifyRefreshToken } from '../auth';
import bcrypt from 'bcrypt';
import { asyncHandlerError } from '../utils/asyncHandlerError';
import dotenv from 'dotenv';
dotenv.config();

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

    const RefreshTokenJWT =signRefreshToken({userId:existing.id});

 
     await DB.storeRefreshToken(RefreshTokenJWT,existing.id)


     res.cookie('refreshToken', RefreshTokenJWT, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: false, // Only send over HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    } );

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
export const EmailAvailability =asyncHandlerError(async(req,res)=>{
     const {email} = req.query;


     let emailfound = await DB.checkAvailabilityOfEmail(email)
     if(emailfound){
          res.status(200).json(emailfound);
     }else{
          res.status(200).json([]);
     }
})
export const refresh = asyncHandlerError(async(req,res)=>{
     const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    // Check if the refresh token is in our database of valid tokens
    const refreshTokenInDb =DB.getUserByRefreshToken(refreshToken);

    if (!refreshTokenInDb) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // 2. Verify the refresh token
      const payload = verifyRefreshToken(refreshToken);
      let user = await DB.getUserById(payload.userId)
     if(!user){
          return res.status(403).json({ message: 'Refresh token is not valid' });
     }

     const newJwt =signJWT({userId:payload.userId});


        res.json({ accessToken: newJwt ,user:user});
});

export const logOutHandler =asyncHandlerError(async(req,res)=>{
     const refreshToken = req.cookies.refreshToken;

         if (refreshToken) {
               // 2. Invalidate the refresh token in our database
               await DB.invalidateRefreshToken(refreshToken);
          }
          res.clearCookie('refreshToken');
          res.status(200).send({ message: "Logged out successfully" });
})
