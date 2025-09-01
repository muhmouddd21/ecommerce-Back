import { Product } from './../types';
import { ExpressHandler } from "../types";
import { DB } from '../datastore';
import { asyncHandlerError } from '../utils/asyncHandlerError';
import { BaseError } from '../services/Base.Error';


export const getProducts=asyncHandlerError(async(req,res,next)=>{
    if (req.query.productId) {
    return getProductsByids(req, res, next);
  }
  if (req.query.cat_prefix) {
    return getProductsByCat(req, res, next);
  }
  throw new BaseError(
        "Bad Request",
        400,
        "Missing query parameters",
        true
  );
})




export const getProductsByCat:ExpressHandler<{catTitle:string},Product[]> = asyncHandlerError(async (req,res)=>{
    const {cat_prefix} = req.query;
    const products =await DB.getProductsByCatTitle(cat_prefix);

    if(!products || products.length <= 0){
        throw new BaseError(
            "NotFoundError",
            404,
            "No products found, check the category",
            true
        )
    }
    
    res.send(products)
})
export const getProductsByids = asyncHandlerError(async (req,res)=>{
    let productIds = req.query.productId;
    if (!productIds) {
        return res.status(400).json({ message: "productId is required" });
    }
      if (!Array.isArray(productIds)) {
            productIds = [productIds];
        }
    const ids = productIds.map((id:any) => Number(id)).filter((id:any) => !isNaN(id));
    const products =await DB.getProductsByids(ids);


    return res.status(200).json(products)
    
})

