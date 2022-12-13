import { People } from './people.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Gifts } from '../gifts/gift.model';


@Injectable({
    providedIn: 'root'
})

export class PeopleService implements OnInit {
  person: People;
  people: People[] = [];
  peopleChangedEvent = new Subject<People[]>();


  constructor( private http: HttpClient) {
    this.fetchPeople();
    this.peopleChangedEvent.next(this.people.slice());
    //console.log('People OnConstruct');
    //console.log(this.people);
  }

  ngOnInit() {
    console.log('People OnInit');
    console.log(this.people);
    // if (this.people.length === 0) {
    //   this.fetchPeople();
    //   this.peopleChangedEvent.next(this.people.slice());

    // } else {
    //   this.peopleChangedEvent.next(this.people.slice());

    // }

    this.peopleChangedEvent.next(this.people.slice());
    console.log(this.people);
  }

 fetchPeople() {
    this.http
    .get<{message:string, people: People[]}>('http://localhost:5000/people')
    .subscribe((response) => {
      // for (let person of response.people ) {
      //   this.people.push(person);
      // };
      this.people = response.people;
      console.log(response.message);
      //console.log(this.people);
      this.peopleChangedEvent.next([...this.people]);
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
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: String, person: People}>('http://localhost:5000/people',
      newbie)//, {headers: headers})
      .subscribe((responseData) => {
        console.log(responseData.message)
        this.people.push(newbie);
        this.peopleChangedEvent.next([...this.people]);
        //this.fetchPeople();
        
      } 
    );
  }

  deletePerson(person: People) {
    if (!person) {
      return;
    }
    console.log('Delete:')
    console.log(person.pNumber);
    this.http.delete('http://localhost:5000/people/' + person.pNumber)
    .subscribe((response: Response) => {
      //console.log(response);
      const updatedPeople = this.people.filter(p => p.pNumber !== person.pNumber)
      console.log(updatedPeople);
      this.people = updatedPeople;
      this.peopleChangedEvent.next([...this.people]);
    })
  }

  updateWishlist(originalP: People, newP: People, gift: Gifts) {
    if (!originalP || !newP || !gift) {
      return;
    }

    const pos = this.people.findIndex(d => d.pNumber === originalP.pNumber);

    if (pos < 0) {
      return;
    }

    // set the id of the new person to the id of the old person
    newP.pNumber = originalP.pNumber;
    //newDocument._id = originalDocument._id;
    //add gift to OG wishlist then set the newP wishlist to og + 
    originalP.wishlist.push(gift);
    newP.wishlist = originalP.wishlist;
    console.log(originalP);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:5000/people/' + originalP.pNumber,
      newP, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.people[pos] = newP;
        }
      );
  }

  deleteWish(person: People, giftNumber: number) {
    if (!person || !giftNumber) {
      return;
    }
    console.log('Delete:')
    console.log(giftNumber);
    const ppos = this.people.findIndex(d => d.pNumber === person.pNumber);
    const gpos = this.people[ppos].wishlist.findIndex(d => d.giftNumber === giftNumber);
    
    if (ppos < 0) {
      return;
    }

    person.wishlist[gpos].pop();
    console.log(person);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:5000/people/' + person.pNumber,
    person, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.people[ppos] = person;
        }
      );
    }
}

