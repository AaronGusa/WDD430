import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  contactGroupLength: any;
  id: string;
  

  constructor(private contactService: ContactService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
        //console.log(this.contact);
        if (this.contact.group && this.contact.group !== null || undefined ) {
          if(this.contact.group.length > 0) {
          this.contactGroupLength = this.contact.group.length;
          //console.log(this.contactGroupLength);
          };
        } else {
          this.contactGroupLength = null;
          //console.log('null or undefined group length');
        }
      }
    )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

}
