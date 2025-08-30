import { dataStore } from "..";
import { User, Post, Comment, Like } from "../../types";

export class InmemoryStore implements dataStore{

    private users:User[]=[];
    private posts:Post[]=[];
    private comments:Comment[]=[];
    private likes:Like[]=[];

    createUser(user: User): Promise<void> {
       this.users.push(user);
       return Promise.resolve();
    }
    getUserByEmail(email: String): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.email === email))
    }
    getUserById(id: String): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.id === id));
    }
    getUserByUsername(username: String): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.username === username))
    }
    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts)
    }
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id: String): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(p => p.id === id)) ;
    }
    deletePost(id: String): Promise<void> {
        const index = this.posts.findIndex(p=> p.id === id);
        if(index === -1){
            return Promise.resolve();
        }
        this.posts.splice(index,1);
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComment(postId: String): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(c => c.postId =postId));
    }
    deleteComment(id: String): Promise<void> {
        const index = this.comments.findIndex(c=> c.id === id);
         if(index === -1){
               return Promise.resolve();
        }
        this.comments.splice(index,1)
        return Promise.resolve();
    }
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    
}