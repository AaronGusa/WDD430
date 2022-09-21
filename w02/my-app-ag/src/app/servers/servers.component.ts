import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //template: `
  //  <app-server></app-server>
  //  <app-server></app-server>`

  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'test Server';
  
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created with the Server Name of ' + this.serverName;

  }

  onUpdateServerName(event: any) {
    // console.log(event);
    this.serverName = event.target.value;
//    this.serverName = <HTMLInputElement>.event.target.value; //optional alternative to previous line

  }

}
