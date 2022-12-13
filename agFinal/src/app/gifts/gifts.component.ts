import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { People } from '../people/people.model';
import { PeopleService } from '../people/people.service';
import { Gifts } from './gift.model';
import { GiftsService } from './gifts.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit, OnDestroy {
  private giftListChanged: Subscription;
  private peopleList: Subscription;
  
  changeValue: People;
  newPerson: People;


  gifts: Gifts[] = [];
  gift: Gifts;
  people: People[] = [];


  constructor(private gService: GiftsService,
              private http: HttpClientModule,
              private pService: PeopleService) {
    
              }

  ngOnInit() {
    this.gifts = this.gService.getGifts();
    this.giftListChanged = this.gService.giftsChangedEvent
    .subscribe((gifts: Gifts[]) => {
      this.gifts = gifts;
      //console.log(this.gifts);
    });

    this.people = this.pService.getPeople();
    // if (this.people.length === 0) {
    // this.peopleService.fetchPeople();}

    this.peopleList = this.pService.peopleChangedEvent
    .subscribe((people: People[]) => {
      this.people = people;
      //console.log(this.people);
    });
    
  }

  onChange(event: any){
    //console.log(event.value);
    this.changeValue = event.value;
  }

  onSubmit( gift: Gifts) {
    //console.log(this.changeValue);
    //console.log(gift);

    this.newPerson = this.changeValue;
    //this.changeValue.wishlist.push(gift);
    //console.log(this.changeValue);
    //console.log(this.newPerson);

    this.pService.updateWishlist(this.changeValue, this.newPerson, gift);
    this.changeValue = null;
    this.newPerson = null;


  }

  ngOnDestroy(): void {
    this.peopleList.unsubscribe();
    this.giftListChanged.unsubscribe();
  }

  
}
