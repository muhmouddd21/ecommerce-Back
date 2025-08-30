import { Product } from './../types';
import { ExpressHandler } from "../types";
import { DB } from '../datastore';


export const getProductsByCat:ExpressHandler<{catTitle:string},{products:Product[]}> =async (req,res)=>{
    const {cat_prefix} = req.query;
    const products =await DB.getProductsByCatTitle(cat_prefix);
    res.send({
        products
    })
}

