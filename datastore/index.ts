import { CommentDao } from './Dao/commentDao';
import { likeDao } from './Dao/LikeDao';
// import { InmemoryStore } from './memoryDb';
import { PostDao } from './Dao/PostDao';
import { UserDeo } from './Dao/userDao';
import { sqliteDataStore } from "./sqlDB/index";
export interface dataStore extends UserDeo,PostDao,CommentDao,likeDao{};


export let DB :dataStore;

export async function initializeDB(){
     DB = await new sqliteDataStore().openDb();

}
