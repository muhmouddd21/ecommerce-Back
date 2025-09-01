import { productId } from './../../types';


export interface wishlistDao{
    listWishlistOfUser(userid:number,productId?:number):Promise<number[]>
    AddToWishList(userId:number,productId:number):Promise<void>;
    removeFromWishList(userId:number,productId:number):Promise<void>;
}

