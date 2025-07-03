import { Post } from "../../types";

export interface PostDao{
    listPosts():Promise<Post[]>;
    createPost(post:Post):Promise<void>;
    getPost(id:String):Promise<Post|undefined>;
    deletePost(id:String):Promise<void>;
}