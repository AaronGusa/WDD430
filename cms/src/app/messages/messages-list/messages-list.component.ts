import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Messages } from '../message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messages: Messages[]; 
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


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messageChangedEvent.subscribe(
      (messages: Messages[]) => {
        this.messages = messages;
      }
    );
    this.messages = this.messageService.getMessages();

    //console.log(this.messages)
  }

  // onAddMessage(message: Messages) {
  //   this.messages.push(message);
  // }

}
