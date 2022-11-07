import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  numberOfContacts: string;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  newContact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    imageUrl: '',
    group: []
  };
  contactAddError: boolean = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          if (this.id === null || undefined) {
            this.editMode = false;
            return;
          } else {
            this.originalContact = this.contactService.getContact(this.id);
            if (this.originalContact === null || undefined) {
              return;
            } else {
              this.editMode = true;
              this.contact = JSON.parse(JSON.stringify(this.originalContact));
              if (this.contact['group']) {
                for (let member of this.contact.group) {
                  this.groupContacts.push(member);
                    // new FormGroup({
                    //   'name': new FormControl(member.name),
                    //   'email': new FormControl(member.email),
                    //   'phone': new FormControl(member.phone),
                    //   'imageUrl': new FormControl(member.imageUrl),
                  

                  //}
                  //
                };
                //console.log('GroupContacts:')
                //console.log(this.groupContacts);

              };
              this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));

              return this.contact;
            }
          }
        }
      }
    );
    //console.log('Line 72: ');
    //console.log(this.groupContacts);
  }

  onSubmit(f: NgForm) {
    //console.log(`Submitted!!!`);
    //console.log(f);
    // submittedId = this.currentParam;

      this.newContact.name = f.value.name;
      this.newContact.email = f.value.email;
      this.newContact.phone = f.value.phone;
      this.newContact.imageUrl = f.value.imageUrl;
      this.newContact.group = this.groupContacts;

      //console.log(this.newContact.group);

      if (this.editMode) {
        this.newContact.id = this.id;
        //console.log(this.submittedDoc);
        this.contactService.updateContact(this.originalContact, this.newContact);
        this.router.navigate(['./contacts']);
      } else {
        this.numberOfContacts = this.contactService.totalContacts();
        this.newContact.id = this.numberOfContacts;
        this.contactService.addContact(this.newContact);

        this.router.navigate(['./contacts']);
      }
    }

  onCancel() {
    //console.log('Ya cancelled boiii')
    this.router.navigate(['./contacts']);
  }


  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      //console.log('line 112: !newContact = true')
      this.contactAddError = true;
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      //console.log('line 117: this.contact && newContact.id === this.contact.id')
      this.contactAddError = true;
      return true;
    }

    for (let i = 0; i <this.groupContacts.length; i++) {
      //console.log(`line 122: ${i}`)
      if (newContact.id === this.groupContacts[i].id) {
        //console.log(newContact[i].name);
        this.contactAddError = true;
        return true;
      }
    }
    //console.log('line 128: false')
    this.contactAddError = false;
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    //console.log('Add To Group Added:');
    //console.log(selectedContact);
    //console.log(invalidGroupContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.contactAddError = false;

    //console.log(this.groupContacts);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.contactAddError = false;
    //console.log('Removed');
    //console.log(this.groupContacts);
  }

}
