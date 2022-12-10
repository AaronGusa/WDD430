import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { People } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person: People;
  pNumber: string;
  

  wishlist: any = [
    // {name: "RoboTron",
    //  link: "https://mdbcdn.b-cdn.net/img/new/standard/nature/086.webp",
    //  bought: false,

    // },
    // {name: "Dino",
    //  link: "https://mdbcdn.b-cdn.net/img/new/standard/people/086.webp",
    //  bought: true,
    
    // }
  ] 
  
  constructor(private peopleService: PeopleService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.pNumber = params['id'].toString();
        this.person = this.peopleService.getPerson(this.pNumber);
      }
    )
  }



}
