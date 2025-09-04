import express from 'express'
import { EmailAvailability, refresh, signinHandler, signupHandler } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup',signupHandler)
userRouter.post('/signin',signinHandler)
userRouter.post('/fresh',refresh)
userRouter.get('/',EmailAvailability)

export { userRouter };