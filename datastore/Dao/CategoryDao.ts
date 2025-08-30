import { Category } from './../../types';

export interface CategoryDao{
    listCategories():Promise<Category[]>
}