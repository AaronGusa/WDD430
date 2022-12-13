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
  category: Array<any> = [
    {1: "Books"},
    {2: "Clothing"},
    {3: "Electronics"},
    {4: "Games"},
    {5: "Toys"},
    {6: "Misc"}
  ];
  
  
  bookList: Gifts[] = [];
  clothingList: Gifts[] = [];
  electronicsList: Gifts[] = [];
  gamesList: Gifts[] = [];
  toysList: Gifts[] = [];
  miscList: Gifts[] = [];

  bookListSub = new Subject<Gifts[]>();
  clothingListSub = new Subject<Gifts[]>();
  electronicsListSub = new Subject<Gifts[]>();
  gamesListSub = new Subject<Gifts[]>();
  toysListSub = new Subject<Gifts[]>();
  miscListSub = new Subject<Gifts[]>();

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.fetchGifts();
    
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
    //this.giftsChangedEvent.next(this.gifts.slice());
    this.giftsChangedEvent.next(this.gifts.slice());
    //this.onCategorize()
    // this.bookListSub.next([...this.bookList]);
    // this.clothingListSub.next([...this.clothingList]);
    // this.electronicsListSub.next([...this.electronicsList]);
    // this.gamesListSub.next([...this.gamesList]);
    // this.toysListSub.next([...this.toysList]);
    // this.miscListSub.next([...this.miscList]);
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
    .get<{message:string, Gifts: Gifts[]}>('http://localhost:5000/gifts')
    .subscribe((response) => {
      this.gifts = response.Gifts;
      console.log(response.message);
      this.giftsChangedEvent.next(this.gifts.slice());
      this.onCategorize();
      }
      
    );
    
    //console.log(this.gifts);
  }

  getGifts() {
    return this.gifts.slice();
  }

  getGift(giftNumber: number) {
      for (let gift of this.gifts) {
        if (gift.giftNumber === giftNumber) {
          return gift;
        }}
    this.giftsChangedEvent.next(this.gifts.slice());
  }

  printGifts() {
    console.log(this.gifts.slice());
  }

  onCategorize() {
    
    if(this.gifts.length > 0) {
      for (let gift of this.gifts) {
        if (gift.category === 1) {
          this.bookList.push(gift);
        } else if (gift.category === 2) {
          this.clothingList.push(gift);
          
        } else if (gift.category === 3) {
          this.electronicsList.push(gift);
          
        } else if (gift.category === 4) {
          this.gamesList.push(gift);

        } else if (gift.category === 5) {
          this.toysList.push(gift);
        } else if (gift.category === 6) {
          this.miscList.push(gift);
      } else {
        this.onCategorize();
        console.log('loading...')
      }
    }
  }
    this.giftsChangedEvent.next(this.gifts.slice());
    this.bookListSub.next([...this.bookList]);
    this.clothingListSub.next([...this.clothingList]);
    this.electronicsListSub.next([...this.electronicsList]);
    this.gamesListSub.next([...this.gamesList]);
    this.toysListSub.next([...this.toysList]);
    this.miscListSub.next([...this.miscList]);
   }

}
