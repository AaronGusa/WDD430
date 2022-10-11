import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LogginService } from '../logging.service';
// import { LogginService } from '../logging.service'; // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //This helps Angular know what to provide
  //providers: [LogginService]
})
export class NewAccountComponent {
  
  
  
  
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  //Proper way to inject a service
  constructor(private loggingService: LogginService,
              private accountService: AccountsService) {
                this.accountService.statusUpdated.subscribe(
                  (status: string) => alert('New Status: ' + status)
                );
              }

  onCreateAccount(accountName: string, accountStatus: string) {
    // Using our account service
    this.accountService.addAccount(accountName, accountStatus);
    //Using our logging service
    //this.loggingService.logStatusChange(accountStatus);


    //WE ARE NO LONGER LISTENING TO THAT EMITTER
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    

    // const service = new LogginService(); // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR
    // service.logStatusChange(accountStatus); // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR
    //console.log('A server status changed, new status: ' + accountStatus);
  }
}
