import { Like } from "../types";

export interface likeDao{
    createLike(like:Like):void;
}