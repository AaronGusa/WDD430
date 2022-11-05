import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[];
  document: Document;
  //documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  maxId: number;
  currentId: number;
  maxDocumentId: number;
  documentListClone: Document[];
  
  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (this.document of this.documents.slice()) {
      //console.log(document);
      if (this.document.id === id) {
        //console.log('Doc ID: ' + id);
        return this.document;
      }; 
    };
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListClone = this.documents.slice();

    this.documentChangedEvent.next(this.documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    };
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    };
    newDocument.id = originalDocument.id;
    document[pos] = newDocument;
    this.documentListClone = this.documents.slice();
    this.documentChangedEvent.next(this.documentListClone);
    return;
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
    this.documentChangedEvent.next(this.documents.slice());
  }
  
  getMaxId(): number {

    this.maxId = 0; 

    for (let document of this.documents) {
        this.currentId = +document.id;
        if (this.currentId > this.maxId) {
            this.maxId = this.currentId};
    //endIf
    //endFor

    return this.maxId;
  }
  }
}
