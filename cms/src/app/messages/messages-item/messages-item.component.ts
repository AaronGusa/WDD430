import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Messages } from '../message.model';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit {
  @Input() message: Messages;
  messageSender: string = '';


  constructor(private contactService: ContactService) {}

  ngOnInit() {
    //console.log(this.message);
    //console.log('This is the message sender number: ' + this.message.sender)
    const contact: Contact = this.contactService.getContact(this.message.sender);
    //console.log('This is the contact:' + contact.name);
    //console.log('This is the message sender number: ' + this.message.sender)
    this.messageSender = contact.name;
    //console.log(contact.name);
  }


}
