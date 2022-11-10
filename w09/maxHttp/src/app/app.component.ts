import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    //Error handling option 2
    //Subscribing to the error variable in the posts.service file
    //and setting it to our error variable inside our subscription
    //to avoid memory leaks

    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })


    this.isFetching = true;
    // Send Http request
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts;
    }, error => {
      //Error Handling Option 1:
      this.error = `Error ${error.status}: ${error.statusText} ${error.error.error}`;
      console.log(error);
    });

  }

  onCreatePost(postData: Post) {
    //console.log(postData);
    // Send Http request
    ///////////////////////////// moved to postService
    // this.http
    //   //.post( //we can add the this property
    //   .post<{ name: string }>(  
    //     'https://wdd430http-default-rtdb.firebaseio.com/posts.json', //.json is a firebase req'mnt
    //     postData
    //   )
    //   .subscribe(responseData => { //Posts are only sent in ang when you sub to them
    //   });
    ////////////////////////////

    //Now we can call our service
    this.postService.createAndStorePost(postData.title, postData.content);

  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts;
    }, error => {
      //this.error = error.message; //Max's error message
      this.error = `Error ${error.status}: ${error.statusText} ${error.error.error}`;

    })


  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }


  //MOVED to posts.service
  // private fetchPosts() {
  //   this.isFetching = true;
  //   //////////////////////////////Moved 
  // //   this.http.get< {[key: string]: Post} >('https://wdd430http-default-rtdb.firebaseio.com/posts.json')
  // //   //.pipe(map((responseData: {[key: string]: Post}) => { //this can be done better with <> and get
  // //   .pipe(map(responseData => {  
  // //     const postsArray: Post[] = [];
  // //     for (const key in responseData) {
  // //       if (responseData.hasOwnProperty(key)) {
  // //       postsArray.push({ ...responseData[key], id: key });
  // //       }
  // //     }
  // //     return postsArray;
  // //   })) //you can run observable data through multiple operators before getting to subscribe.
  // //   .subscribe(posts => {
  // //     this.isFetching = false;
  // //     //You can handle jSON here but we can write cleaner code and keep this leaner.
  // //     this.loadedPosts = posts;
  // //     //console.log(posts);
  // //   })
  //   this.postService.fetchPosts();
  // }

  onHandleError() {
    this.error = null;
    this.isFetching = false;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
