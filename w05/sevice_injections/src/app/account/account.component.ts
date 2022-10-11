import { Component, Input } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LogginService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers: [LogginService] //ONLY add services here that you want to initiate a new service to be used with child levels
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  //REPLACED WITH ACCOUNT SERVICE
  //@Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LogginService,
              private accountsService: AccountsService) {}


  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status)
    this.accountsService.statusUpdated.emit(status);
    //REPLACED WITH ACCOUNT SERVICE
    //this.statusChanged.emit({id: this.id, newStatus: status});
    
    //this.loggingService.logStatusChange(status);
  }
}
