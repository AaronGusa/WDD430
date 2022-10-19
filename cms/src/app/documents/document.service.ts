import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (let document of this.documents.slice()) {
      if (document.id === id) {
        return document;
      } else {
        console.log('Why isnt this working')
        return null;
      }
    }
  }
  
  documentSelectedEvent = new EventEmitter<Document>();

}
