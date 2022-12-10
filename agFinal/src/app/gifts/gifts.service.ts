import { Gifts } from './gift.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GiftsService implements OnInit {
  gifts: Gifts[] = [];
  giftsChangedEvent = new Subject<Gifts[]>();


  constructor( private http: HttpClient) {
    this.fetchGifts();
    this.giftsChangedEvent.next(this.gifts.slice());

    //console.log('Gift OnConstruct');
    //console.log(this.gifts);
  }

  ngOnInit() {
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

 async fetchGifts() {
    await this.http
    .get<{message:string, Gifts: Gifts[]}>('http://localhost:3000/gifts')
    .subscribe((response) => {
      
      //console.log(response.message);
      this.gifts = response.Gifts;
      //console.log(this.gifts);
    });
    this.giftsChangedEvent.next(this.gifts.slice());
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
