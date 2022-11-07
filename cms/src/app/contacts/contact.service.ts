import { Contact } from "./contact.model";
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";

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


    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
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
        this.contactListClone = this.contacts.slice();

        this.contactChangedEvent.next(this.contactListClone);
        console.log('Added New Contact')
        return this.contactListClone;
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
        this.contactChangedEvent.next(this.contacts.slice());
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
        total = total++;
        let totalString = total.toString();        
        return totalString;
    }
    
}

