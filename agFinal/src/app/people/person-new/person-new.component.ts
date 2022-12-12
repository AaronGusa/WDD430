import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { People } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-new',
  templateUrl: './person-new.component.html',
  styleUrls: ['./person-new.component.css']
})
export class PersonNewComponent {
person: People;
newPerson = {
  name: '',
  imageUrl: '',
  bio: '',
  wishlist: [],
  pNumber: ''
};
numberOfPeople: number;

constructor(private peopleService: PeopleService,
            private router: Router) {}

onSubmit(f: NgForm) {
  //console.log(`Submitted!!!`);
  //console.log(f);
  // submittedId = this.currentParam;

    this.newPerson.name = f.value.name;
    this.newPerson.imageUrl = f.value.imageUrl;
    this.newPerson.bio = f.value.bio;
    this.newPerson.wishlist = [];
    // this.newPerson.pNumber = ;

    console.log(this.newPerson.imageUrl);

    this.numberOfPeople = this.peopleService.totalPeople();
    //console.log('Number of People');
    //console.log(this.numberOfPeople);
    this.numberOfPeople = this.numberOfPeople + 1;
    //console.log('adding one');
    //console.log(this.numberOfPeople);
    this.newPerson.pNumber = this.numberOfPeople.toString();
    //console.log('Being placed in function:');
    //console.log(this.newPerson);

    this.peopleService.addPerson(this.newPerson);
    this.peopleService.fetchPeople();

    this.peopleService.peopleChangedEvent.next(this.peopleService.people.slice());

    this.router.navigate(['./people']);
  }

  onCancel() {
    this.router.navigate(['./people']);
  }

    
}
