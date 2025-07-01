export interface User{
    id:String,
    email:String,
    username:String,
    firstName:String,
    lastName:String,
    password:String
}
export interface Post{
    id:String,
    title:String,
    url:String,
    postedAt:number,
    userId:String
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
