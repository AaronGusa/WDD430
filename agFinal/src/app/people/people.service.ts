import { People } from './people.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PeopleService implements OnInit {
  people: People[] = [];
  peopleChangedEvent = new Subject<People[]>();


  constructor( private http: HttpClient) {
    this.fetchPeople();
    console.log('People OnConstruct');
    console.log(this.people);
  }

  ngOnInit() {
    console.log('People OnInit');
    console.log(this.people);
    this.fetchPeople();
    console.log(this.people);
  }

 fetchPeople() {
    this.http
    .get<{message:string, people: People[]}>('http://localhost:3000/people')
    .subscribe((response) => {
      this.people = response.people;
      console.log(response.message);
      console.log(this.people);
      this.peopleChangedEvent.next(this.people.slice());
    });
  }

  getPeople() {
    return this.people.slice();
  }

  printPeople() {
    console.log(this.people);
  }


}
