import express from 'express'
import { EmailAvailability, signinHandler, signupHandler } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup',signupHandler)
userRouter.post('/signin',signinHandler)

userRouter.get('/',EmailAvailability)

export { userRouter };