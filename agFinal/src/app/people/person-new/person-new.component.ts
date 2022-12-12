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
newPerson: People;
numberOfPeople: number;

constructor(private peopleService: PeopleService,
            private router: Router) {}

onSubmit(f: NgForm) {
  //console.log(`Submitted!!!`);
  //console.log(f);
  // submittedId = this.currentParam;

    this.newPerson.name = f.value.name;
    this.newPerson.imageUrl = f.value.email;
    this.newPerson.bio = f.value.phone;
    this.newPerson.wishlist = [];
    // this.newPerson.pNumber = ;

    //console.log(this.newContact.group);

    this.numberOfPeople = this.peopleService.totalPeople();
    this.newPerson.pNumber = this.numberOfPeople.toString();

    console.log(this.newPerson);
    this.peopleService.addPerson(this.newPerson);

    this.router.navigate(['./people']);
  }

  onCancel() {
    this.router.navigate(['./people']);
  }
    
}
