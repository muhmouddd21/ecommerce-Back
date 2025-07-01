import { dataStore } from "..";
import { User, Post, Comment, Like } from "../../types";

export class InmemoryStore implements dataStore{
    private users:User[]=[];
    private posts:Post[]=[];
    private comments:Comment[]=[];
    private likes:Like[]=[];

    createUser(user: User): void {
       this.users.push(user);
    }
    getUserByEmail(email: String): User | undefined {
        return this.users.find(u => u.email === email);
    }
    getUserByUsername(username: String): User | undefined {
        return this.users.find(u => u.username === username);
    }
    listPosts(): Post[] {
        return this.posts;
    }
    createPost(post: Post): void {
        this.posts.push(post);
    }
    getPost(id: String): Post | undefined {
        return this.posts.find(p => p.id === id);
    }
    deletePost(id: String): void {
        const index = this.posts.findIndex(p=> p.id === id);
        if(index === -1){
            return;
        }
        this.posts.splice(index,1);
    }
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    listComment(postId: String): Comment[] {
        return this.comments.filter(c => c.postId =postId);
    }
    deleteComment(id: String): void {
        const index = this.comments.findIndex(c=> c.id === id);
         if(index === -1){
            return;
        }
        this.comments.splice(index,1)
    }
    createLike(like: Like): void {
        this.likes.push(like);
    }
    
}