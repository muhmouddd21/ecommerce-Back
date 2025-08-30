import { createPost, listposts } from './controllers/postController';
import express from 'express';
const cors = require("cors");
import { initializeDB } from './datastore';
import { signinHandler, signupHandler } from './controllers/userController';
import { authMiddleware } from './Middlewares/authMiddleware';
import { listCategories } from './controllers/categoryController';
import { getProductsByCat } from './controllers/productController';

(async()=>{

await initializeDB(); // server will not be running if that doesn't work
console.log("initialized successfully");

const app = express();
app.use(cors());

app.use(express.json());



app.post('/v1/signup',signupHandler)
app.post('/v1/signin',signinHandler)
app.get('/v1/category',listCategories);
app.get('/v1/products',getProductsByCat);
app.use(authMiddleware);

app.get('/v1/posts',listposts)
app.post('/v1/posts',createPost)
app.listen(3000)
})()
// import { createClient } from 'redis';

// const client = createClient({
//   socket: {
//     host: 'localhost',
//     port: 6379,
//   },
// });

// client.on('error', (err) => console.error('Redis Client Error', err));

// async function testRedisConnection(){
//     try {
//         await client.connect();
//         await client.mSet(["name","mahmoud","age","10"]);
//         const values = await client.mGet(["name","age"]); 
//         console.log("connected to redis");
//         console.log(values);
        
//       // list  // Lpush,Rpush,Lrange,Lpop,Rpop
        
//     } catch (error) {   
//         console.error(error);
        
//     }finally{
//         await client.quit()
//     }
// }
// testRedisConnection();


