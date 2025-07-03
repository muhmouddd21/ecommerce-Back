import { CommentDao } from './Dao/commentDao';
import { likeDao } from './Dao/LikeDao';
import { InmemoryStore } from './memoryDb';
import { PostDao } from './Dao/PostDao';
import { UserDeo } from './Dao/userDao';

export interface dataStore extends UserDeo,PostDao,CommentDao,likeDao{};

export const DB = new InmemoryStore();