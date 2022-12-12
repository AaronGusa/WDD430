import { Component, Input } from '@angular/core';
import { People } from '../people.model';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {
  @Input() people: People[];

  constructor(private viewport: ViewportScroller) {}


  onScrollToTop(): void {
    this.viewport.scrollToPosition([0,0]);
    
  }

}
