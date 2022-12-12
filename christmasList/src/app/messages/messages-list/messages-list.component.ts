import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../message.service';
import { Messages } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit, OnDestroy {
  messages: Messages[]; 
  private messageListChange: Subscription;
  // = [
  //   new Messages(999, 'Amazon Package Delivered', 
  //   "You're package of CRAYONS has been delivered",
  //   "Amazon.com"),
  //   new Messages(998, "Elder's Quorum Party", 
  //     "Big BBQ! Meat and drinks provided",
  //     "EQ Presidency"),
  //     new Messages(997, "Milk?", 
  //     "Hey Hon, could you grab milk on the way home?",
  //     "Ambs")  
  // ];


  constructor(private messageService: MessageService,
              private contactService: ContactService) { }

  ngOnInit() {
    //this.messages = this.messageService.getMessages();
    this.contactService.getContacts();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Messages[]) => {
        this.messages = messages;
      }
    );


    //console.log(this.messages)
  }

  // onAddMessage(message: Messages) {
  //   this.messages.push(message);
  // }
  ngOnDestroy() {
    if(this.messageListChange) {
    this.messageListChange.unsubscribe();
    }
  }

}
