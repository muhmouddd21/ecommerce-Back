import cookieParser from "cookie-parser";
import { createPost, listposts } from './controllers/postController';
import express, { Request, Response,NextFunction,ErrorRequestHandler } from 'express';
const cors = require("cors");
import { initializeDB } from './datastore';
import { authMiddleware } from './Middlewares/authMiddleware';
import  {userRouter}  from "./Routes/user.Routes";
import { BaseError } from './services/Base.Error';
import { categoryRouter } from './Routes/category.Routes';
import { productsRoutes } from './Routes/product.Routes';
import { wishlistRoutes } from './Routes/wishlist.Routes';
(async()=>{

await initializeDB(); // server will not be running if that doesn't work
console.log("initialized successfully");

const app = express();
app.use(cors(
  {
  origin: true, // my React app
  credentials: true,               // allow cookies
}
));



app.use(express.json());


app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/v1/users',userRouter);
app.use('/v1/categories',categoryRouter);
app.use('/v1/products',productsRoutes);

app.use(authMiddleware);
app.use('/v1/wishlist',wishlistRoutes)

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


const PORT = parseInt(process.env.PORT ?? "3000", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


})()



