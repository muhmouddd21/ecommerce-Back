import { getProducts } from './../controllers/productController';
import express from 'express'

const productsRoutes =express.Router()

productsRoutes.get('/',getProducts );


export {productsRoutes}
