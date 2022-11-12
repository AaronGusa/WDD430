import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Messages } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Messages[] = [];
  messageChangedEvent  = new EventEmitter<Messages[]>(); 

  constructor(
    private http: HttpClient
  ) { 
    this.fetchMessages();
    //this.messages = MOCKMESSAGES;
  }

  getMessages( ) {
    //console.log('before Messages Fetch');
    this.fetchMessages();
    //console.log(this.messages);
    //console.log('After Messages Fetch');
    return this.messages.slice();
  }

  getMessage(id: number) {
    for (let message of this.messages.slice()) {
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
    this.storeMessages();    
    //this.messageChangedEvent.emit(this.messages.slice());
  }

  fetchMessages() {
    this.http
    .get('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: Messages[]) => {
      this.messages = messages;
      //console.log('Messages Fetched');
      //console.log(this.messages);
      this.messageChangedEvent.next(this.messages.slice());
    }, error => {
      console.log(`Error: ${error}`);
    })
  }

  storeMessages() {
    const messagesStringed = JSON.stringify(this.messages);
    this.http
    .put('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/messages.json', 
      messagesStringed, {
        headers: new HttpHeaders( {
          'Content-type': 'application/json'
        })
      })
    .subscribe(
      (response: Messages[]) => {
        this.messages = response;
        this.messageChangedEvent.next(this.messages.slice())
      }
    )

  }

}
