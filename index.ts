import { createPost, listposts } from './controllers/postController';
import express from 'express';
const app = express();

import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function testRedisConnection(){
    try {
        await client.connect();
        await client.mSet(["name","mahmoud","age","10"]);
        const values = await client.mGet(["name","age"]); 
        console.log("connected to redis");
        console.log(values);
        
        
        
    } catch (error) {   
        console.error(error);
        
    }finally{
        await client.quit()
    }
}
testRedisConnection();


app.use(express.json());



app.get('/posts',listposts)
app.post('/posts',createPost)
app.listen(3000)