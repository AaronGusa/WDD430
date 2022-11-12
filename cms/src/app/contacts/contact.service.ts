import { Contact } from "./contact.model";
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { map, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contacts: Contact[];
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

    setContacts(contacts: Contact[]) {
        this.contacts = contacts;
        //console.log(contacts);

    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        for (let contact of this.contacts.slice()) {
            if (contact.id === id) {
                return contact;
            } else {
                console.log();
            } 
        }
    }

    addContact(newContact: Contact) {
        if(!newContact) {
            return;
        }
        newContact.id = this.totalContacts();
        this.contacts.push(newContact);
        
        
        this.storeContacts();
        
        //this.contactListClone = this.contacts.slice();

        // this.contactChangedEvent.next(this.contactListClone);
        // console.log('Added New Contact')
        // return this.contactListClone;
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        };
        const pos = this.contacts.indexOf(originalContact);
        if(pos < 0) {
            return;
        }
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.contactListClone = this.contacts.slice();
        this.contactChangedEvent.next(this.contactListClone);
        //console.log(`Updated ${newContact.name}'s Contact`);
        //console.log(`Updated ${newContact.imageUrl}'s Contact`)
        this.storeContacts();

    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        //this.contactChangedEvent.next(this.contacts.slice());
        this.storeContacts();
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
        .get('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/contacts.json')
        // .pipe(map(responseData => {
        //     const array: Contact[] = [];
        //     for (const key in responseData) {
        //         if (responseData.hasOwnProperty(key)) {
        //             array.push({...responseData[key], id: key});
        //         }
        //     }
        //     this.contacts = array;
        // }        ))
        .subscribe((contacts: Contact[]) => {
            this.setContacts(contacts);
            this.getSorted();
            this.contactChangedEvent.next(this.contacts.slice());
        }
        )
    }

    storeContacts() {
        const contactStringed = JSON.stringify(this.contacts);
        this.http
        .put('https://cmstestproject-4aa23-default-rtdb.firebaseio.com/contacts.json',
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
            this.getSorted();
            this.contactChangedEvent.next(this.contacts.slice())}
        )
    }


    
}

