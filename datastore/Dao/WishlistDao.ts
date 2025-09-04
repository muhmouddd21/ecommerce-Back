import { productId } from './../../types';


export interface wishlistDao{
    listWishlistOfUser(userid:string,productId?:number):Promise<number[]>
    AddToWishList(userId:string,productId:number):Promise<void>;
    removeFromWishList(userId:string,productId:number):Promise<void>;
    
}

