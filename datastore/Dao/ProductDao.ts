import { Category, Product } from './../../types';

export interface ProductDao{
    getProductsByCatTitle(title:string):Promise<Product[]>
}