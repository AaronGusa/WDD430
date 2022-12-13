import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gifts } from '../gift.model';
import { GiftsService } from '../gifts.service';


@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit{
  gift: Gifts;
  giftsSlice: Gifts[];
  giftNumber: number;
  

  constructor(private gService: GiftsService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
                this.giftsSlice = this.gService.gifts;
              }
  
  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.giftNumber = params['id'];
        //console.log(this.giftNumber);
        //console.log(params['id'])
        this.gift = this.getGift(this.giftNumber);
        console.log(this.gift);
      }
    )
    console.log(this.gift);
  }

  getGift(id: number) {
    for (let gift of this.giftsSlice) {
      if (gift.giftNumber === id) {
          return gift;
    }};
  } 
}

