import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  //error handling Option 2
  //Using a subject imported through rjxs and then implemented in the createAndStorePost() function
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    // moved from app.components onCreatePost function
    const postData: Post = {title: title, content: content};
    this.http
      //.post( //we can add the this property
      .post<{ name: string }>(  
        'https://wdd430http-default-rtdb.firebaseio.com/posts.json', //.json is a firebase req'mnt
        postData
      )
      .subscribe(responseData => { console.log(responseData);//Posts are only sent in ang when you sub to them
      }, error => {
        //Error Handling Option 2:
      this.error.next(`Error ${error.status}: ${error.statusText} ${error.error.error}`);
      console.log(error);
      }); // We can include the subscribe here in the service because it doesn't care about the 
      // response.
  }

  fetchPosts() {
    //moved from fetchPosts in app.component
    return this.http.get< {[key: string]: Post} >('https://wdd430http-default-rtdb.firebaseio.com/posts.json')
    //.pipe(map((responseData: {[key: string]: Post}) => { //this can be done better with <> and get
    .pipe(map(responseData => {  
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
        postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    }),
    //Error handling option 3
    catchError(errorRes => {
      //Send to anlytics server
      return throwError(errorRes);
    })
    ) //you can run observable data through multiple operators before getting to subscribe.
    // .subscribe(posts => { //Because we return all this we can subscribe in the component
    //   // this.isFetching = false;
    //   // //You can handle jSON here but we can write cleaner code and keep this leaner.
    //   // this.loadedPosts = posts;
    //   //console.log(posts);
    // })
  }

  deletePosts() {
    return this.http.delete('https://wdd430http-default-rtdb.firebaseio.com/posts.json')
  }

}

