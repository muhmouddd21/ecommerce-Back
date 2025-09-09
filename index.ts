import cookieParser from "cookie-parser";
import { createPost, listposts } from './controllers/postController';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from "cors";
import { initializeDB } from './datastore';
import { authMiddleware } from './Middlewares/authMiddleware';
import { userRouter } from "./Routes/user.Routes";
import { BaseError } from './services/Base.Error';
import { categoryRouter } from './Routes/category.Routes';
import { productsRoutes } from './Routes/product.Routes';
import { wishlistRoutes } from './Routes/wishlist.Routes';

// Remove the async wrapper and use proper error handling
const startServer = async () => {
  try {
    // Initialize database
    await initializeDB();
    console.log("Database initialized successfully");

    const app = express();
    
    // CORS configuration
    app.use(cors({
      origin: true, // Your React app
      credentials: true, // Allow cookies
    }));

    app.use(express.json());
    app.use(cookieParser());

    // Health check endpoint - must respond quickly
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Root endpoint for Railway health checks
    app.get('/', (req, res) => {
      res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
      });
    });

    // Routes
    app.use('/v1/users', userRouter);
    app.use('/v1/categories', categoryRouter);
    app.use('/v1/products', productsRoutes);

    // Protected routes
    app.use(authMiddleware);
    app.use('/v1/wishlist', wishlistRoutes);

    app.get('/v1/posts', listposts);
    app.post('/v1/posts', createPost);

    // Error handling middleware
    const errorHandler: ErrorRequestHandler = (
      err: any,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      console.error('Error occurred:', err);
      
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

    // Get port from environment variable (Railway provides this)
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    
    // Start server
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();



