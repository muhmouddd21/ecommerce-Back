import { RequestHandler } from "express";

export type ExpressHandler<req,res>=RequestHandler<
string,
Partial<res>,
Partial<req>,
any>;
export interface User{
    id:string,
    email:String,
    firstName:String,
    lastName:String,
    password:string,
    login?:String,
}
export interface Post{
    id:String,
    title:String,
    url:String,
    postedAt:number,
    userId:String
}
export interface Category{
    id:number,
    title:string,
    prefix:string,
    img:string
}
export interface Product{
    id:number,
    title:string,
    price:string,
    cat_prefix:string,
    img:string,
    max:number
}

export interface Like{
    postId:String,
    userId:String
}
export interface Comment{
    id:String,
    userId:String,
    postId:String,
    comment:String,
    postedAt:number
}
export interface jwtObject{
    userId:string
}
export type productId ={
    id:number
}
export type withError<T> = T & {error: string};