import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;
  submittedDoc ={
    id: '',
    name: '',
    description: '',
    url: '',
    children: {}
  };


  constructor(private docService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']) {
          this.id = params['id'];
          if (this.id === null || undefined || params === params['new']) {
           // console.log(3);
            this.editMode= false;
            //console.log('ID was Null or Undefined. Error 1 Line 26 Doc-edit.component')
            return;
          } else {
            this.originalDocument = this.docService.getDocument(this.id);
            if (this.originalDocument === null || undefined) {
              console.log('ID was Null or Undefined. Error 2 Line 31 Doc-edit.component')
              return;
            } else {
              this.editMode = true;
              
              this.document = JSON.parse(JSON.stringify(this.originalDocument));
              //Console Confirmation
              //console.log('ID was Found. Generated from Line 36 Doc-edit.component')
              //console.log(`Document ID: (${this.id}) Object Returned:`);
              //console.log(`This document's name is ${this.document.name}`);
              //console.log(this.document);
              
              return this.document;
            }
          }
        } else {
          return;
        }
      }
    )
  }

  onCancel() {
    console.log('Canceled');
    this.router.navigate(['./documents']);
  }

  onSubmit(f: NgForm) {
    //console.log(`Submitted!!!`);
    // submittedId = this.currentParam;

    this.submittedDoc.name = f.value.name;
    this.submittedDoc.description = f.value.description;
    this.submittedDoc.url = f.value.url;
    
    
    //console.log(this.submittedDoc);

    if (this.editMode) {
      this.submittedDoc.id = this.id;
      //console.log(this.submittedDoc);
      this.docService.updateDocument(this.originalDocument, this.submittedDoc);
      // this.router.navigate(['./documents']);
    } else {
      this.docService.addDocument(this.submittedDoc);
      this.router.navigate(['./documents']);
      return;
    }


  }

}
