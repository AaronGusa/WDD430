import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { People } from './people.model';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  private peopleListChange: Subscription;
  people: People[];
  
  constructor(private peopleService: PeopleService) {
    this.peopleService.getPeople();
    
    this.peopleService.printPeople();
  }

  ngOnInit() {
    this.peopleListChange = this.peopleService.peopleChangedEvent
    .subscribe((people: People[]) => {
      this.people = people;
      console.log(this.people);
    });
  }

  ngOnDestroy() {
    this.peopleListChange.unsubscribe();
  }

}
