import { Injectable, EventEmitter } from '@angular/core';
import { Messages } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ContactService } from '../contacts/contact.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Messages[] = [];
  //messageChangedEvent  = new EventEmitter<Messages[]>(); 
  messageChangedEvent = new Subject<Messages[]>();

  constructor(
    private http: HttpClient,
    private contactService: ContactService
  ) { 
    this.fetchMessages();
    this.contactService.getContacts();
  }

  getMessages( ) {
    //console.log('before Messages Fetch');
    //this.fetchMessages();
    
    //console.log(this.messages);
    //console.log('After Messages Fetch');
    return this.messages.slice();
  }

  getMessage(id: string) {
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
    if(!newMessage) {
      return;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, postedMessage: Messages}>('http://localhost:3000/messages',
    newMessage)
    .subscribe(response => {
      console.log(response.message);
      this.messages.push(response.postedMessage);
      this.messageChangedEvent.next(this.messages.slice());
    })
    
    //this.messages.push(newMessage);
    //this.storeMessages();    
    //this.messageChangedEvent.emit(this.messages.slice());
  }

  fetchMessages() {
    this.http
    .get<{message: string, messages: Messages[]}>('http://localhost:3000/messages')
      .subscribe((response) => {
        //console.log(response.message);
        this.messages = response.messages;
        //console.log('Messages Fetched');
        //console.log(this.messages);
        this.messageChangedEvent.next(this.messages.slice());
    
      });
  }

  storeMessages() {
  
    
    const messagesStringed = JSON.stringify(this.messages);
    this.http
    .put('http://localhost:3000/messages', 
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
