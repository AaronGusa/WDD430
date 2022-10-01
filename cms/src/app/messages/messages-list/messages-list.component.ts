import { Component, OnInit } from '@angular/core';
import { Messages } from '../model.messages';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messages: Messages[] = [
    new Messages(999, 'Amazon Package Delivered', 
    "You're package of CRAYONS has been delivered",
    "Amazon.com"),
    new Messages(998, "Elder's Quorum Party", 
      "Big BBQ! Meat and drinks provided",
      "EQ Presidency"),
      new Messages(997, "Milk?", 
      "Hey Hon, could you grab milk on the way home?",
      "Ambs")  
  ];


  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Messages) {
    this.messages.push(message);
  }

}
