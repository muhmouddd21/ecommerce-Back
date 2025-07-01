import { Post } from "../types";

export interface PostDao{
    listPosts():Post[];
    createPost(post:Post):void;
    getPost(id:String):Post|undefined;
    deletePost(id:String):void;
}