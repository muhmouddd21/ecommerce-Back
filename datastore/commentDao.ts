import {Comment} from '../types'

export interface CommentDao{
    createComment(comment:Comment):void;
    listComment(postId:String):Comment[];
    deleteComment(id:String):void;
}