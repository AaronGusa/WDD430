import { Contact } from "./contact.model";
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { map, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ContactService implements OnInit {
    contacts: Contact[] = [];
    contactSelectedEvent = new Subject<Contact>();
    contactChangedEvent = new Subject<Contact[]>();

    maxId: number;
    currentId: number;
    maxContactId: number;
    contactListClone: Contact[];


    constructor(
        private http: HttpClient
    ) {
        this.fetchContacts();
        //this.contacts = MOCKCONTACTS;
        //this.maxContactId = this.getMaxId();
    }

    ngOnInit(){
        console.log('Contacts OnInit')
        console.log(this.contacts);
        this.fetchContacts();
        console.log(this.contacts);
    }

    setContacts(contacts: Contact[]) {
        this.contacts = contacts;
        //console.log(contacts);

    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        this.fetchContacts();
        //console.log('Get Contacts');
        //console.log(this.contacts);
        for (let contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            } else {
                //console.log('Contact Not Found');
            } 
        }
    }

    addContact(newContact: Contact) {
        if(!newContact) {
            return;
        }
        newContact.id = '';
        //console.log(newContact);
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
          newContact, { headers: headers })
          .subscribe((responseData) => {
              //console.log(responseData);
              // add new document to documents
              this.contacts.push(responseData.contact);
              //this.getSorted();
            }
          );
      }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Document to the id of the old Document
        newContact.id = originalContact.id;
        //newDocument._id = originalDocument._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/contacts/' + originalContact.id,
          newContact, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.contacts[pos] = newContact;
            }
          );
      }

    // updateContact(originalContact: Contact, newContact: Contact) {
    //     if (!originalContact || !newContact) {
    //         return;
    //     };
    //     const pos = this.contacts.indexOf(originalContact);
    //     if(pos < 0) {
    //         return;
    //     }
    //     newContact.id = originalContact.id;
    //     this.contacts[pos] = newContact;
    //     this.contactListClone = this.contacts.slice();
    //     this.contactChangedEvent.next(this.contactListClone);
    //     //console.log(`Updated ${newContact.name}'s Contact`);
    //     //console.log(`Updated ${newContact.imageUrl}'s Contact`)
    //     this.storeContacts();

    // }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        //const pos = this.contacts.indexOf(contact);
        // if (pos < 0) {
        //     return;
        // }
        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
            .subscribe((response: Response) => {
                console.log(response);
            //this.contacts.splice(pos, 1);
                this.contactChangedEvent.next(this.contacts.slice());
        });
    }

    getMaxId(): number {

        this.maxId = 0; 
    
        for (let contact of this.contacts) {
            this.currentId = +contact.id;
            if (this.currentId > this.maxId) {
                this.maxId = this.currentId};
        //endIf
        //endFor
    
        return this.maxId;
      }
      }

    totalContacts() {
        let total: number = this.contacts.length;
        //console.log(total);
        
        total = total + 1;

        //console.log(`After adding 1: ${total}`);
        let totalString = total.toString();        
        return totalString;
    }

    getSorted() {
        this.contacts.sort((a: any, b: any) => {
          a = a.name,
          b = b.name;
          return a == b ? 0 : a > b ? 1 : -1; 
        });
    
        this.contactChangedEvent.next(this.contacts.slice());
      }

    fetchContacts() {
        this.http
        .get<{message: string, contact: Contact[]}>('http://localhost:3000/contacts')
        .subscribe((response) => {
            this.contacts = response.contact;
            this.contactChangedEvent.next(this.contacts);
        });
    }

    storeContacts() {
        const contactStringed = JSON.stringify(this.contacts);
        this.http
        .put('http://localhost:3000/contacts',
            contactStringed, {
                headers: new HttpHeaders( {
                    'Content-Type': 'application/json'
                })
        })
        .subscribe(
            response => 
            {
                // console.log('Response');
                // console.log(response)
            //this.getSorted();
            this.contactChangedEvent.next(this.contacts.slice())}
        )
    }


    
}

