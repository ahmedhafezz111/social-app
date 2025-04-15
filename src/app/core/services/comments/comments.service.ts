import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }
  

  createComment(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/comments`,data)
  }

  getPostsComment(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/posts/${postId}/comments`)
  }

  updateComment(commentId:string,data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/comments/${commentId}`,data)
  }

  deleteComment(commentId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/comments/${commentId}`)
  }


}
