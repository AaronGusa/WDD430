import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DirectiveNotes';
  showTemplate = false;


  // templateOnOff() {
  //   if (this.showTemplate = true) {
  //     this.showTemplate = false;
  //   } else {
  //     this.showTemplate = true;
  //   }
  // }

  showIt() {
    
  }

  templateOn() {
    // if (this.showTemplate = false) {
      this.showTemplate = true;
    // } 
  }
  templateOff() {
    this.showTemplate = false
  }

}
