import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
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
  _id: string;
  message: string;

  
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';
    //console.log(document);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          // add new document to documents
          this.documents.push(responseData.document);
          this.getSorted();
        }
      );
  }
  //OLD CODE PRE BACKEND
  // addDocument(newDocument: Document) {
  //   if (!newDocument) {
  //     return;
  //   }
  //   //this.maxDocumentId++;
  //   newDocument.id = '';
  
  //   this.documents.push(newDocument);
  //   console.log(this.documents);
  //   //this.documentListClone = this.documents.slice();
  //   this.getSorted();

  //   this.storeDocuments();

  //   //this.documentChangedEvent.next(this.documentListClone);
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.getSorted();
        }
      );
  }
  //OLD UPDATE
  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   };
  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   };
  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   //this.documentListClone = this.documents.slice();
  //   this.getSorted();
  //   this.storeDocuments();
  //   //this.documentChangedEvent.next(this.documentListClone);
  // }


deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.getSorted();
      }
    );
}
//OLD Delete
  // deleteDocument(document: Document) {
  //   if (!document) {
  //      return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //      return;
  //   }
  //   this.documents.splice(pos, 1);
  //   //this.documentChangedEvent.next(this.documents.slice());
  //   this.storeDocuments();
  // }
  
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
      //.get('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/documents.json')
      .get<{message: string, documents: Document[]}>('http://localhost:3000/documents')
        .subscribe((response) => {
          //console.log(response.message);
          //console.log(response.message);

          this.setDocuments(response.documents);
          this.maxDocumentId = this.getMaxId();
          this.isError = false;
          this.getSorted();

          this.documentChangedEvent.next(this.documents.slice());

    
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
      .put('http://localhost:3000/documents',
      putStringed, {
        headers: new HttpHeaders( {'Content-Type': 'application/json'})
      })
      .subscribe(responseData => 
        { 
          console.log('Response')
          console.log(responseData);
          this.documentChangedEvent.next(this.documents.slice());
      // }, error => {
      //   this.error.next(`Error ${error.status}: ${error.statusText} ${error.error.error}`);
      //   console.log(error);
      });     
  }
  
}
