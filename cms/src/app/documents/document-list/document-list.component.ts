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
    new Document(1, 'Recipe1', 'To make the sweetest 1st recipe on the site', 'URL', {'recipe children': '5'}),
    new Document(2, 'Recipe2', 'To make the sweetest 2nd recipe on the site', 'URL', {'recipe children': '4'}),
    new Document(3, 'Recipe3', 'To make the sweetest 3nd recipe on the site', 'URL', {'recipe children': '3'}),
    new Document(4, 'Recipe4', 'To make the sweetest 4nd recipe on the site', 'URL', {'recipe children': '2'}),
    new Document(5, 'Recipe5', 'To make the sweetest 5nd recipe on the site', 'URL', {'recipe children': '1'})
  ];



  constructor() { }

  ngOnInit(): void {
  }

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
