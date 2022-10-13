import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Messages } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {
  currentSender: string = '7';
  i =-1;
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  //@Output() addMessageEvent = new EventEmitter<Messages>();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.i = this.messageService.getMessagesTotal();
  }

  onSendMessage() {
    this.i++;
    const subject = this.subjectRef.nativeElement.value;
    const msgTxt = this.msgTextRef.nativeElement.value;
    const newMessage = new Messages(this.i, subject, msgTxt, this.currentSender);
    console.log(newMessage);

    this.messageService.addMessage(newMessage);
    //this.messageSer Type 'Messages' is missing the following provice.addMessage(newMessage);
    //this.addMessageEvent.emit(message);
    //console.log('Added Message Number ' + this.i);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
    // console.log('Cleared');
  }


}
