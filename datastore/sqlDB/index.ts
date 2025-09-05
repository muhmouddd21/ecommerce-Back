import { dataStore } from "..";
import { User, Post, Comment, Like, Category, Product, productId } from "../../types";

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
         await this.db.run('INSERT INTO USERS(email,firstName,lastName,password,id) VALUES(?,?,?,?,?)',user.email,user.firstName,user.lastName,user.password,user.id)
    }
    async getUserByEmail(email: String): Promise<User | undefined> {
         return await this.db.get<User>("select * from users where email = ?",email);
    }
    async getUserByRefreshToken(refreshToken:string):Promise<User | undefined>{
        return await this.db.get( 
            `select *
            from refresh_tokens inner join users 
            on refresh_tokens.user_id = users.id
            where token = ?
            
            `,refreshToken);
    }
    async storeRefreshToken(refreshToken:string,userId:string):Promise <void>{
        const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
        await this.db.run('INSERT INTO refresh_tokens(token,user_id,expires_at) VALUES(?,?,?)',refreshToken,userId,expiresAt);

    }
    async invalidateRefreshToken(refreshToken:string):Promise <void>{
        await this.db.run('DELETE from refresh_tokens where token =?',refreshToken);
    }
    async checkAvailabilityOfEmail(email:string):Promise<string | undefined>{
        return await this.db.get<string>("select email from users where email = ?",email);
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
    listCategories(): Promise<Category[]> {
       return this.db.all<Category[]>('SELECT * from categories')
    }
    getProductsByCatTitle(cat:string):Promise<Product[]> {
        return this.db.all<Product[]>('select * from products where cat_prefix =?',cat);
    }
    async getProductsByids(ids:number[]):Promise<Product[]>{
        const placeholders = ids.map(() => "?").join(",");
        const sql = `SELECT * FROM products WHERE id IN (${placeholders})`;
        const rows = await this.db.all(sql, ids);
        return rows;
    }
    listWishlistOfUser(userId:string,productId?:number):Promise<number[]>{
        if(productId !== undefined){
            return this.db.all<number[]>('select productId from wishlist where userId = ? and productId = ? ',userId,productId);
        }
        return this.db.all<number[]>('select productId from wishlist where userId =?',userId);
    }
    async AddToWishList(userId:string,productId:number):Promise<void>{
        await this.db.run('INSERT OR IGNORE INTO wishlist(userId,productId) VALUES(?,?)',userId,productId);

    }
    async removeFromWishList(userId: string, productId: number): Promise<void> {
        await this.db.run(
            'DELETE FROM wishlist WHERE userId = ? AND productId = ?',
            userId,
            productId
        );
    }
    
}