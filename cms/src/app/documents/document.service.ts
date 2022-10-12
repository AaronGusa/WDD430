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

  getDocument(id: number) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      } else {
        return null;
      }
    }
  }
  
  documentSelectedEvent = new EventEmitter<Document>();

}
