import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(servernameInput) {
    // console.log(servernameInput.value);
    this.serverCreated.emit({
      serverName: servernameInput.value, //this.newServerName, 
      serverContent: this.serverContentInput.nativeElement.value
    });
    
    // OLD
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

  onAddBlueprint(servernameInput) {
    console.log(servernameInput.value);
    this.blueprintCreated.emit({
      serverName: servernameInput.value, //this.newServerName, 
      serverContent: this.serverContentInput.nativeElement.value
      //serverContent: this.newServerContent
    });

    // OLD
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }
}
