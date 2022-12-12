import { Gifts } from './gift.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class GiftsService implements OnInit {
  gifts: Gifts[] = [];
  giftsChangedEvent = new Subject<Gifts[]>();
  giftsTested: Gifts[];

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.fetchGifts();
    this.giftsChangedEvent.next(this.gifts.slice());

    //console.log('Gift OnConstruct');
    //console.log(this.gifts);
  }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: Data) => {
        this.gifts = data['Gifter'];
      }
    )
    //console.log('Gift OnInit');
    //console.log(this.gifts.length);
    //this.fetchGifts();
    this.giftsChangedEvent.next(this.gifts.slice());
    // if (this.gifts.length === 0) {
    //   this.fetchGifts();
    //   this.giftsChangedEvent.next(this.gifts.slice());
    //     console.log('Santa CAME!!!')
    // } else {
    //   this.giftsChangedEvent.next(this.gifts.slice());
    //     console.log('We already got our gifts!')
    // }
    // console.log(this.gifts);
  }

 fetchGifts() {
    this.http
    .get<{message:string, Gifts: Gifts[]}>('http://localhost:5000/gifts')
    .subscribe((response) => {
      this.gifts = response.Gifts;
      console.log(response.message);
      this.giftsChangedEvent.next(this.gifts.slice());
      //console.log(this.gifts);
    });
    
    //console.log(this.gifts);
  }

  getGifts() {
    
    return this.gifts.slice();
  }

  getGift(giftNumber: number) {
    if (this.gifts.length === 0) {
      this.fetchGifts();
      for (let gift of this.gifts) {
        if (gift.giftNumber === giftNumber) {
            this.giftsChangedEvent.next(this.gifts.slice());
          return gift;
        }}
    } else {
      for (let gift of this.gifts) {
        if (gift.giftNumber === giftNumber) {
          return gift;
        } else {
            console.log('NO');
        }
      }
    }
    this.giftsChangedEvent.next(this.gifts.slice());
  }

  printGifts() {
    console.log(this.gifts.slice());
  }


}
