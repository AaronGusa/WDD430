import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { People } from '../people.model';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  private peopleList: Subscription;
  person: People;
  pNumber: string;
  people: People[];
  

  wishlist: any = [
    // {name: "RoboTron",
    //  link: "https://mdbcdn.b-cdn.net/img/new/standard/nature/086.webp",
    //  bought: false,

    // },
    // {name: "Dino",
    //  link: "https://mdbcdn.b-cdn.net/img/new/standard/people/086.webp",
    //  bought: true,
    
    // }
  ] 
  
  constructor(private peopleService: PeopleService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.people = this.peopleService.getPeople();
    // if (this.people.length === 0) {
    // this.peopleService.fetchPeople();}

    this.peopleList = this.peopleService.peopleChangedEvent
    .subscribe((people: People[]) => {
      this.people = people;
      //console.log(this.people);
    });

    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.pNumber = params['pNumber'].toString();
        this.person = this.peopleService.getPerson(this.pNumber);
      }
    )
  }

  onDelete() {
    this.peopleService.deletePerson(this.person);
    //this.peopleService.fetchPeople();
    this.peopleService.peopleChangedEvent.next(this.peopleService.people.slice());
    this.router.navigate(['./people']);

  }

  onDeleteWish(originalP: People, newP: People, giftNumber: number) {
    this.peopleService.deleteWish(this.person, giftNumber);
    //this.peopleService.fetchPeople();
    this.peopleService.peopleChangedEvent.next(this.peopleService.people.slice());
    this.router.navigate(['./people']);

  }

}
