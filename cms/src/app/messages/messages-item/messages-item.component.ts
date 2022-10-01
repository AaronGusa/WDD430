import { Component, OnInit, Input } from '@angular/core';
import { Messages } from '../model.messages';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit {
  @Input() message: Messages;

  constructor() { }

  ngOnInit(): void {
  }

}
