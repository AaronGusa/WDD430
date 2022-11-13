import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: any = [];
  document: Document;
  
  //Error Handling
  error: any;
  errorHasChanged = new Subject<string>();
  isError: boolean = false

  //documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  maxId: number;
  currentId: number;
  maxDocumentId: number;
  documentListClone: Document[];

  
  constructor(private http: HttpClient) { 
    //this.documents = MOCKDOCUMENTS;
    this.fetchDocuments();
    //this.maxDocumentId = this.getMaxId();
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    
    this.documentChangedEvent.next(this.documents.slice());
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
    console.log(this.documents);
    //this.documentListClone = this.documents.slice();
    this.getSorted();

    this.storeDocuments();

    //this.documentChangedEvent.next(this.documentListClone);
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
    this.documents[pos] = newDocument;
    //this.documentListClone = this.documents.slice();
    this.getSorted();
    this.storeDocuments();
    //this.documentChangedEvent.next(this.documentListClone);
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
    //this.documentChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }
  
  getMaxId(): number {

    this.maxId = 0; 

    for (let document of this.documents) {
        this.currentId = +document.id;
        if (this.currentId > this.maxId) {
            this.maxId = this.currentId};
    //endIf
    //endFor
    }
    return this.maxId;
  }

  getSorted() {
    this.documents.sort((a,b) => {
      a = a.name,
      b = b.name;
      return a == b ? 0 : a > b ? 1 : -1; 
    });

    this.documentChangedEvent.next(this.documents.slice());
  }

  fetchDocuments() {
    this.http
      .get('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        //console.log(documents);

        this.setDocuments(documents);
        this.maxDocumentId = this.getMaxId();
        this.isError = false;
        this.documents.sort((a,b) => {
          a = a.name,
          b = b.name;
          return a == b ? 0 : a > b ? 1 : -1; 
        });

        this.documentChangedEvent.next(this.documents.slice());

        //console.log(this.documents)
        //console.log(this.documents[0]); 
        }, error => {
          //console.log(error);
          this.isError = true;
          this.error = error;
          this.errorHasChanged.next(`Error ${error.status}: ${error.statusText} ${error.error.error}`);

          //console.log(this.error);
        });
    //console.log(this.documents.slice());
  }

  errorFound() {
    if (this.isError) {
      return true;
    } else {
      return false;
    }
  }

  storeDocuments() {
    const putStringed = JSON.stringify(this.documents);
    this.http
      .put('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/documents.json',
      putStringed, {
        headers: new HttpHeaders( {'Content-Type': 'application/json'})
      })
      .subscribe(responseData => 
        { 
          console.log('Response')
          console.log(responseData);
          this.documentChangedEvent.next(this.documents.slice());
      }, error => {
        this.error.next(`Error ${error.status}: ${error.statusText} ${error.error.error}`);
        console.log(error);
      });     
  }
  
}
