import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[];
  //documentSliced: any;
  
  constructor() { 
    this.documents = MOCKDOCUMENTS;
    //this.documentSliced = this.documents.slice();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (let document of this.documents.slice()) {
      //console.log(document);
      if (document.id === id) {
        //console.log('Doc ID: ' + id);
        return document;
      }; 
    };
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
  
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();


}
