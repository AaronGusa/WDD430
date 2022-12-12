import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contactList: Contact[];
  searchedList: Contact[];
  term: string = '';
  private contactListChange: Subscription;
  
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();
    //this.contactList = this.contactService.contacts;
    this.contactListChange = this.contactService.contactChangedEvent
      .subscribe( (contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.contactListChange.unsubscribe();
  }

}
