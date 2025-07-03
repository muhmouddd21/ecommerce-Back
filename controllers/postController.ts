import { RequestHandler } from "express";
import { DB } from "../datastore";
import { Post } from "../types";
import crypto from "crypto";
export type ExpressHandler<req,res>=RequestHandler<
string,
Partial<res>,
Partial<req>,
any>;


export type StrictExpressHandler<req, res> = RequestHandler<
  string,
  res,
  req,
  any
>;

type PostRequired = Pick<Post,'title'|'url'|'userId'>;

export const listposts:ExpressHandler<{},PostRequired[]> = (_request,response)=>{

     const posts = DB.listPosts();
      response.send(posts);
}
export const createPost:StrictExpressHandler<PostRequired,{}> = (request,response)=>{

    if (!request.body.title || !request.body.url || !request.body.userId) {
     response.status(400).send({ error: 'Missing fields' });
     return;
    }
    const post:Post = {
        id:crypto.randomUUID(),
        postedAt:Date.now(),
        title:request.body.title,
        url:request.body.url,
        userId:request.body.userId
    }

    DB.createPost(post);
    response.sendStatus(200);

}