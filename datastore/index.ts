import { CommentDao } from './commentDao';
import { likeDao } from './LikeDao';
import { InmemoryStore } from './memoryDb';
import { PostDao } from './PostDao';
import { UserDeo } from './userDao';

export interface dataStore extends UserDeo,PostDao,CommentDao,likeDao{};

export const DB = new InmemoryStore();