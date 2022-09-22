import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {
  userName = '';
  userSuccessInput = '';
  constructor() { }

  ngOnInit(): void {
  }

  onUpdateUserSuccess(event: any) {
    this.userName = event.target.value;
    this.userSuccessInput = 'We love you ' + this.userName + '!!!';
  }

  resetUserInput() {
    this.userName = '';
    this.userSuccessInput = '';
  }
}
