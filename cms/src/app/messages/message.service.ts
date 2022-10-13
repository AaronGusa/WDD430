import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Messages } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Messages[] = [];
  messageChangedEvent  = new EventEmitter<Messages[]>(); 

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages( ) {
    return this.messages.slice();
  }

  getMessage(id: number) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      } else {
        return null;
      }
    }
  }

  //For incrementation when message id is needed for newly added messages
  getMessagesTotal() {
    return this.messages.length;
  }

  addMessage(newMessage: Messages) {
    this.messages.push(newMessage);
    this.messageChangedEvent.emit(this.messages.slice());
  }

}
