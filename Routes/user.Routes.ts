import express from 'express'
import { EmailAvailability, logOutHandler, refresh, signinHandler, signupHandler } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup',signupHandler)
userRouter.post('/signin',signinHandler)
userRouter.post('/fresh',refresh)
userRouter.post('/logout',logOutHandler)
userRouter.get('/',EmailAvailability)

export { userRouter };