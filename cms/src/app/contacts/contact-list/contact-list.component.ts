import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];

  
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactList = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contact: Contact[]) => {
        this.contactList = contact;
      }
    )
  }

}
