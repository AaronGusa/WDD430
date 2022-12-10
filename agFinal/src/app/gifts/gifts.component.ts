import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gifts } from './gift.model';
import { GiftsService } from './gifts.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  private giftListChanged: Subscription;
  gifts: Gifts[] = [];
  gift: Gifts;


  constructor(private gService: GiftsService,
              private http: HttpClientModule) {
    
              }

  ngOnInit() {
    this.gifts = this.gService.getGifts();
    this.giftListChanged = this.gService.giftsChangedEvent
    .subscribe((gifts: Gifts[]) => {
      this.gifts = gifts;
      console.log(this.gifts);
    });
  }

  
}
