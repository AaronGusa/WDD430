import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
    console.log(this.selectedFeature);
  }

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  //   console.log('On Navagate: ' + feature);
  // }
}
