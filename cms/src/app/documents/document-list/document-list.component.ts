import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  
  documents: Document[];
  private docListChange: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.docListChange = this.documentService.documentChangedEvent
      .subscribe( (documentsList: Document[]) => {
        this.documents = documentsList;
      });
    // this.documents = this.documentService.getDocuments();
    // this.documentService.documentChangedEvent.subscribe(
    //   (document: Document[]) => {
    //     this.documents = document;
    //   }
    // )
  }

  ngOnDestroy() {
    this.docListChange.unsubscribe();
  }

}
