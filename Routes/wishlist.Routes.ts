
import express from 'express'
import { AddToWishList, listWishlistOfUser, removeFromWishList } from '../controllers/wishlistController';

const wishlistRoutes =express.Router()

wishlistRoutes.get('/',listWishlistOfUser);

wishlistRoutes.post('/',AddToWishList)
wishlistRoutes.delete('/:productId',removeFromWishList)

export {wishlistRoutes}