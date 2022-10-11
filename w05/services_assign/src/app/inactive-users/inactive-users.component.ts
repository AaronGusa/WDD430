import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  //REPLACED BY OUR SERVICE
  //@Input() users: string[];
  //@Output() userSetToActive = new EventEmitter<number>();

  users: string[];

  constructor(private userService: UserService) {}

  onSetToActive(id: number) {
    //REPLACED BY OUR SERVICE
    //this.userSetToActive.emit(id);
    this.userService.setToActive(id);
  }

  ngOnInit() {
    this.users = this.userService.inactiveUsers; 
  }
}