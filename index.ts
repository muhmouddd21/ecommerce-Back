import { createPost, listposts } from './controllers/postController';
import express from 'express';
const app = express();
app.use(express.json());



app.get('/posts',listposts)
app.post('/posts',createPost)
app.listen(3000)