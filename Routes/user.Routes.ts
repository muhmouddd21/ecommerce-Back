import express from 'express'
import { signinHandler, signupHandler } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup',signupHandler)
userRouter.post('/signin',signinHandler)

export { userRouter };