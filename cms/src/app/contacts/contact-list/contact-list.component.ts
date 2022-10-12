import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  }

  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
    
  //   //this.selectedContactEvent.emit(contact);
  //   // console.log(contact);
  //   // console.log('onSelected event emitted from contact-list' + contact.name)
  // }

}
