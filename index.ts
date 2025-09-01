import { createPost, listposts } from './controllers/postController';
import express, { Request, Response,NextFunction,ErrorRequestHandler } from 'express';
const cors = require("cors");
import { initializeDB } from './datastore';
import { authMiddleware } from './Middlewares/authMiddleware';
import { listCategories } from './controllers/categoryController';
import { getProductsByCat } from './controllers/productController';
import  {userRouter}  from "./Routes/user.Routes";
import { BaseError } from './services/Base.Error';
import { categoryRouter } from './Routes/category.Routes';
import { productsRoutes } from './Routes/product.Routes';
import { wishlistRoutes } from './Routes/wishlist.Routes';
(async()=>{

await initializeDB(); // server will not be running if that doesn't work
console.log("initialized successfully");

const app = express();
app.use(cors());


app.use(express.json());


app.use('/v1/users',userRouter);
app.use('/v1/categories',categoryRouter);
app.use('/v1/products',productsRoutes);
app.use('/v1/wishlist',wishlistRoutes)

app.use(authMiddleware);

app.get('/v1/posts',listposts)
app.post('/v1/posts',createPost)


const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof BaseError) {
     res.status(err.httpStatusCode).json({
      error: err.name,
      message: err.message,
      isOperational: err.isOperational,
    });
    return;
  }

   res.status(500).json({
    error: "InternalServerError",
    message: "Something went wrong",
  });
};

app.use(errorHandler);


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


