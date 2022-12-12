import { Component, Injectable, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

@Injectable()
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;


  constructor(private docService: DocumentService,
              private activatedServer: ActivatedRoute,
              private router: Router,
              private winRefService: WinRefService) { 
                this.nativeWindow = winRefService.getNativeWindow()
              }
  
  //testing = this.docService.getDocument('10');



  ngOnInit() {
    this.activatedServer.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        //console.log('Param ID: ' + this.id);
        //console.log(this.id + " " + typeof this.id);
        //console.log(this.testing);

        this.document = this.docService.getDocument(this.id);
      }
    );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.docService.deleteDocument(this.document);
    this.router.navigate(['documents'])
  }

}
