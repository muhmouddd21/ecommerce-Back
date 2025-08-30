import { DB } from "../datastore";
import { Category, ExpressHandler } from "../types";

type categoryRequired = Pick<Category , 'title'|'prefix'|'img'  >

export const listCategories:ExpressHandler<{},{categories: categoryRequired[]}> = async(_request,response)=>{

     const categories = await DB.listCategories();
      response.send({
        categories
      });
}