import { getProductsByCat } from './../controllers/productController';
import express from 'express'

const productsRoutes =express.Router()

productsRoutes.get('/',getProductsByCat);


export {productsRoutes}