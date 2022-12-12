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
    //console.log('People OnConstruct');
    //console.log(this.people);
  }

  ngOnInit() {
    console.log('People OnInit');
    console.log(this.people);
    if (this.people.length === 0) {
      this.fetchPeople();
      this.peopleChangedEvent.next(this.people.slice());

    } else {
      this.peopleChangedEvent.next(this.people.slice());

    }
    console.log(this.people);
  }

 async fetchPeople() {
    await this.http
    .get<{message:string, people: People[]}>('http://localhost:5000/people')
    .subscribe((response) => {
      for (let person of response.people ) {
        this.people.push(person);
      };
      console.log(response.message);
      //console.log(this.people);
      this.peopleChangedEvent.next(this.people.slice());
      //console.log('Sliced');
    });
  }

  getPeople() {
    return this.people.slice();
  }

  getPerson(pNumber: string) {
    if (this.people.length === 0) {
      this.fetchPeople();
    } else {
      for (let person of this.people) {
        if (person.pNumber === pNumber) {
          return person;
        }
      }
    }
    this.peopleChangedEvent.next(this.people.slice());
  }

  printPeople() {
    console.log(this.people);
  }

  totalPeople() {
    return this.people.length;
  }

  addPerson(newbie: People) {
    if(!newbie) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: String, person: People}>('http://localhost:5000/people',
      newbie, {headers: headers})
      .subscribe((responseData) => {
        this.people.push(responseData.person);
      }
    );
  }


}
