import { DB } from './datastore/index';
import express from 'express';
const app = express();
app.use(express.json());



app.get('/posts',(_request,response)=>{
    response.send({posts:DB.listPosts()});
})
app.post('/posts',(request,response)=>{
    const post = request.body;
    DB.createPost(post);
    console.log(DB.listPosts());
    
    response.sendStatus(200);
})
app.listen(3000)