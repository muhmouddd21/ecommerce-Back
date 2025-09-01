import { DB } from "../datastore";
import { BaseError } from "../services/Base.Error";
import { Category, ExpressHandler } from "../types";
import { asyncHandlerError } from "../utils/asyncHandlerError";

type categoryRequired = Pick<Category , 'title'|'prefix'|'img'  >

export const listCategories:ExpressHandler<{},categoryRequired[]> = asyncHandlerError(async(_req,res) =>{

    const categories = await DB.listCategories();

    if (!categories || categories.length === 0) {
      throw new BaseError(
        "NotFoundError",
        404,
        "No categories found",
        true
      );
    }

     res.status(200).json(categories);

})