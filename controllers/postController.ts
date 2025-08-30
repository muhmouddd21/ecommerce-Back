import { RequestHandler } from "express";
import { DB } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";



export type StrictExpressHandler<req, res> = RequestHandler<
  string,
  res,
  req,
  any
>;

type PostRequired = Pick<Post,'title'|'url'|'userId'>;

export const listposts:ExpressHandler<{},{posts: PostRequired[]}> = async(_request,response)=>{

     const posts = await DB.listPosts();
      response.send({
        posts:posts
      });
}
export const createPost:StrictExpressHandler<PostRequired,{}> = async(request,response)=>{

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

    await DB.createPost(post);
    response.sendStatus(200);

}