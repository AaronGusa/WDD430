import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gifts } from '../gift.model';
import { GiftsService } from '../gifts.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  private giftListChanged: Subscription;
  private bookListChanged: Subscription;
  private clothingListChanged: Subscription;
  private electronicsListChanged: Subscription;
  private gamesListChanged: Subscription;
  private toysListChanged: Subscription;
  private miscListChanged: Subscription;


  gifts: Gifts[] = [];
  gift: Gifts;

  category: Array<any> = [
    {1: "Books"},
    {2: "Clothing"},
    {3: "Electronics"},
    {4: "Games"},
    {5: "Toys"},
    {6: "Misc"}
  ];
  listsArray: string[] = [
    'bookList', 
    'clothingList',
    'electronicsList',
    'gamesList',
    'toysList',
    'miscList'
  ];

  bookList: Gifts[];
  clothingList: Gifts[];
  electronicsList: Gifts[];
  gamesList: Gifts[];
  toysList: Gifts[];
  miscList: Gifts[];
  
  constructor(private gService: GiftsService,
    private http: HttpClientModule) {

    }

  ngOnInit() {
    this.gifts = this.gService.getGifts();
    // console.log(this.clothingList);
    // this.onCategorize();
    // console.log(this.clothingList);
    
    this.giftListChanged = this.gService.giftsChangedEvent
    .subscribe((gifts: Gifts[]) => {
      this.gifts = gifts;
      
      //console.log(this.gifts);
    });

    this.bookListChanged = this.gService.bookListSub
    .subscribe((books: Gifts[]) => {
      this.bookList = books;
      //console.log(this.gifts);
    });
   this.clothingListChanged = this.gService.clothingListSub
   .subscribe((clothing: Gifts[]) => {
     this.clothingList = clothing;
     //console.log(this.gifts);
   });
   this.electronicsListChanged = this.gService.electronicsListSub
   .subscribe((electronics: Gifts[]) => {
     this.electronicsList = electronics;
     //console.log(this.gifts);
   });
   this.gamesListChanged = this.gService.gamesListSub
   .subscribe((games: Gifts[]) => {
     this.gamesList = games;
     //console.log(this.gifts);
   });
   this.toysListChanged = this.gService.toysListSub
   .subscribe((toys: Gifts[]) => {
     this.toysList = toys;
     //console.log(this.gifts);
   });
   this.miscListChanged = this.gService.miscListSub
   .subscribe((misc: Gifts[]) => {
     this.miscList = misc;
     //console.log(this.gifts);
   });

   

  }

  // onCategorize() {
  //   for (let gift of this.gifts) {
  //     if (gift.category === 1) {
  //       this.bookList.push(gift);
  //     } else if (gift.category === 2) {
  //       this.clothingList.push(gift);
        
  //     } else if (gift.category === 3) {
  //       this.electronicsList.push(gift);
        
  //     } else if (gift.category === 4) {
  //       this.gamesList.push(gift);

  //     } else if (gift.category === 5) {
  //       this.toysList.push(gift);
  //     } else if (gift.category === 6) {
  //       this.miscList.push(gift);
  //     } 
  //   }
  // }
}
