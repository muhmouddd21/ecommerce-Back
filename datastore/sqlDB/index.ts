import { dataStore } from "..";
import { User, Post, Comment, Like } from "../../types";

import sqlite3 from 'sqlite3';
import { Database,open as sqliteOpen } from 'sqlite';

import path  from 'path';

export class sqliteDataStore implements dataStore{

    private db!:Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(){

        this.db = await sqliteOpen({
                filename: path.join(__dirname,'codersquare-sqlite'),
                driver: sqlite3.Database
        })

        this.db.run('PRAGMA foreign_keys= on;');
        await this.db.migrate({
            migrationsPath:path.join(__dirname,'migrations'),
        }
        )
        return this;
    }


    async createUser(user: User): Promise<void> {
         await this.db.run('INSERT INTO USERS(email,firstName,lastName,password,username,id) VALUES(?,?,?,?,?,?)',user.email,user.firstName,user.lastName,user.password,user.username,user.id)
    }
    async getUserByEmail(email: String): Promise<User | undefined> {
         return await this.db.get<User>("select * from users where email = ?",email);
    }
    async getUserByUsername(username: String): Promise<User | undefined> {
        return await this.db.get<User>("select * from users where username = ?",username);
    }
    async getUserById(id: String): Promise<User | undefined> {
        return await this.db.get<User>("select * from users where id = ?",id);
    }
    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM POSTS');
    }
    async createPost(post: Post): Promise<void> {
         await this.db.run('INSERT INTO POSTS(id,title,url,userId,postedAt) VALUES(?,?,?,?,?)',post.id,post.title,post.url,post.userId,post.postedAt);
    }
    getPost(id: String): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: String): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComment(postId: String): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: String): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}