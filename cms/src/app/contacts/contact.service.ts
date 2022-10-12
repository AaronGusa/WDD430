import { Contact } from "./contact.model";
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contacts: Contact[] = [];
    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        for (let contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            } else {
                return null;
            } 
        }
    }

    contactSelectedEvent = new EventEmitter<Contact>();

    

}

