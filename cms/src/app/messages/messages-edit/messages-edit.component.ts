import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Messages } from '../model.messages';

@Component({
  selector: 'app-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {
  currentSender: string = 'Aaron';
  i =-1;
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgTxt') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Messages>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    this.i++;
    const subject = this.subjectRef.nativeElement.value;
    const msgTxt = this.msgTextRef.nativeElement.value;
    const message = new Messages(this.i, subject, msgTxt, this.currentSender);
    this.addMessageEvent.emit(message);
    console.log('Sent');
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
    console.log('cleared');
  }


}
