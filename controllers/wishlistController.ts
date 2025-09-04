import { Request } from "express";
import { DB } from "../datastore";
import { BaseError } from "../services/Base.Error";
import { Category, ExpressHandler, productId } from "../types";
import { asyncHandlerError } from "../utils/asyncHandlerError";


export const listWishlistOfUser:ExpressHandler<{},number[]> = asyncHandlerError(async(req,res) =>{
    const {productId}=req.query;

    const userId=res.locals.user.id;
    if(!userId){
        throw new BaseError(
            "Bad Request",
            400,
            "No userId with that data",
            true
        )
    }
    let productIds:number[]=[];
    if(productId){
        productIds =await DB.listWishlistOfUser(userId,Number(productId))
    }else{
         productIds = await DB.listWishlistOfUser(userId);

    }

 

    if (!productIds) {
      throw new BaseError(
        "NotFoundError",
        404,
        "No categories found",
        true
      );
    }


     res.status(200).json(productIds);

})
export const AddToWishList:ExpressHandler<{userId:number,productId:number},{}> =asyncHandlerError(
  
    async(req,res)=>{
        const userId=res.locals.user.id;
        const {productId}=req.body
        if(userId && productId){
            await DB.AddToWishList(userId,productId)
        }
        res.status(200).json({ message: "Added to wishlist successfully" });
    }
)


export const removeFromWishList = asyncHandlerError(
  async (req: Request<{ productId: string }>, res) => {

    let userId=res.locals.user.id; 
    
    const productId = Number(req.params.productId);
    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    await DB.removeFromWishList(userId, productId);

    res.status(200).json({ message: "Removed from wishlist successfully" });
  }
);
