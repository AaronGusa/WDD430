import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { People } from './people.model';
import { PeopleService } from './people.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  private peopleList: Subscription;
  peopleListChange = new Subject<People[]>();

  people: People[] = [];
  person: People;
  personTest: People[] = [];
  personSelected: boolean = false;
  http: any;

  
  
  constructor(private peopleService: PeopleService) {
    this.personTest = this.peopleService.people;    
    //console.log(this.personTest);
  }

  ngOnInit() {
    this.people = this.peopleService.getPeople();
    // if (this.people.length === 0) {
    // this.peopleService.fetchPeople();}

    this.peopleList = this.peopleService.peopleChangedEvent
    .subscribe((people: People[]) => {
      this.people = people;
      //console.log(this.people);
    });
    
  }

  getPerson(id: string) {
    for (let person of this.people) {
      if (person.pNumber === id) {
        this.personSelected = true;
        return person;
      } else {
        console.log('No Match');
      }
    }

  }

  ngOnDestroy(): void {
    this.peopleList.unsubscribe();
  }

 


}
