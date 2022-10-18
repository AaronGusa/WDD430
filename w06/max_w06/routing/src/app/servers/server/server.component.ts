import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  //selectedServer: {id: number};
  serverSubscription: Subscription;
  
  
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router
            ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'] //server is from the keyvalue pair in routes
        }
      );

    //GOAL OF THE RESOLVER IS TO REPLACE THIS
    // const id = +this.route.snapshot.params['id'];
    
    // this.server = this.serversService.getServer(id);

    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   )

    //console.log("Server ID: " + id);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); //preserve is used when there is no additional being added. Merge is used in that case.
  }

}
