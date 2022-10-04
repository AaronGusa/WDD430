import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document(1, 'Angular QuickLink', "The modern web developer's platform", 'https://angular.io/', {'children': '5'}),
    new Document(2, 'Angular Tutorials', 'To make the sweetest 2nd recipe on the site', 'https://angular.io/tutorial', {'children': '4'}),
    new Document(3, '5 hour Angular Course', 'Take a day and learn Angular', 'https://www.youtube.com/watch?v=2OHbjep_WjQ', {'children': '3'}),
    new Document(4, 'Angular for Beginners', 'Let Mosh introduce Angular to you', 'https://www.youtube.com/watch?v=k5E2AVpwsko', {'children': '2'}),
    new Document(5, 'W3 AngularJS Tutorial', 'A Tutorial specially designed to help you learn AngularJS as quickly and efficiently as possible', 'https://www.w3schools.com/angular/', {'children': '1'})
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
    console.log(document);
  }

}
