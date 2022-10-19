import { Component, Injectable, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

@Injectable()
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  injectableTest;

  constructor(private docService: DocumentService,
              // private routerService: Router,
              private activatedServer: ActivatedRoute) { }

  ngOnInit() {

    this.injectableTest = this.docService.getDocument('1');
    console.log(this.injectableTest);

    this.activatedServer.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        // console.log(this.id);
        // console.log(typeof this.id)
        // console.log(this.docService.getDocument(10))
        this.document = this.docService.getDocument(this.id);
        console.log(this.document);
      }
    );
  }

}
