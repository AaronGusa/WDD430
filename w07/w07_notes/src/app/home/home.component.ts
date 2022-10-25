import { Component, OnInit, OnDestroy } from '@angular/core';

// Required for this observable we need features from rjxs
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // STEP 2
  // To avoid memory leaks we can:
  private firstObsSubscription: Subscription;
  private customIntervalObservable


  constructor() { }

  ngOnInit() {
    //STEP 1
    //This "half-function" gives us an incrementing observable: interval()
    //
    // interval(1000).subscribe( count => {
    // console.log(count);
    // });
    //
    //Observables don't just stop emitting just b/c you're not interested anymore
    //This observable above, will continue console logging even when we nav away
    //from this route. This is considered a memory leak.
    //You should unsubcribe when the observable is no longer needed.

    //STEP 3
    // Take our code from STEP 1 and place it in our constructed variable
    // 
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // })

    //STEP 5
    //Make custom interval - The video shows Observable.create(); but this is deprecated.
      // const customIntervalObservable = new Observable( observer => {
      //   let count = 0;
      //   setInterval( () => {
      //     observer.next(count);
      //     count++;
      //   }, 1000);
      // });

      // customIntervalObservable.subscribe(data => {
      //   console.log(data);
      // });

    // STEP 6
    //ERROR HANDLING
    const customIntervalObservable = new Observable( observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!')) // Our own fabricated error
        };
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => { // fat arrow function to handle our error. No longer red in console and window alerts user.
      console.log(error);
      alert(error.message);
    });

  }
  //STEP 4
    //Implement NgOnDestroy
  ngOnDestroy() {
      this.firstObsSubscription.unsubscribe();
  }

}
