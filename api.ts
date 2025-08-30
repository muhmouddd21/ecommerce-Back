//  user api

import { jwtObject, User } from "./types";

// signup - sign in
export type signUpRequest = Pick<User,'email'| 'firstName'|'lastName'|'id'|'password'>;
export type signUpResponse ={
       jwt:string
};

export type signInRequest = Pick<User,'login'|'password'>;

export type signInResponse = {
   user: Pick<User,'email'| 'firstName'|'lastName'|'id'>,
   jwt:string
}



