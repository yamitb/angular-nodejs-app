import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable,Subject } from 'rxjs';
import { Post } from '../models/Post';

const htttpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[];
  private postsUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient) { }

  //Posts Db functions

  getPostsDb() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/posts')
      .subscribe((responseData) => {
        this.posts = responseData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  
  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }




  //Posts API functions

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  savePost(post: Post) : Observable<Post> {
    return this.http.post<Post>(this.postUrl, post, htttpOptions);
  }

  updatePost(post: Post): Observable<Post>{
     const url = `${this.postUrl}/${post.id}`;

     return this.http.put<Post>(url, post, htttpOptions);
  }

  removePost(post: Post | number) : Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postUrl}/${id}`;

    return this.http.delete<Post>(url,htttpOptions);
  }

  getPost(id: number) : Observable<Post>{
    const url = `${this.postUrl}/${id}`;

    return this.http.get<Post>(url);
  }

}
