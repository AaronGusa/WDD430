import { Component } from '@angular/core';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent {
  wishlist: any = [
    {name: "RoboTron",
     link: "https://mdbcdn.b-cdn.net/img/new/standard/nature/086.webp",
     bought: false,

    },
    {name: "Dino",
     link: "https://mdbcdn.b-cdn.net/img/new/standard/people/086.webp",
     bought: true,
    
    }
  ] 

}
