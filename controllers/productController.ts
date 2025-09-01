import { Product } from './../types';
import { ExpressHandler } from "../types";
import { DB } from '../datastore';
import { asyncHandlerError } from '../utils/asyncHandlerError';
import { BaseError } from '../services/Base.Error';


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

