import express from 'express'
import { listCategories } from '../controllers/categoryController';
const categoryRouter =express.Router()

categoryRouter.get('/',listCategories);


export {categoryRouter}