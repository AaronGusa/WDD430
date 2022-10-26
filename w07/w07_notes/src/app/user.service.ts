import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class UserService {
    //This is the old way of doing the data passing
    
    //activatedEmitter = new EventEmitter<boolean>();

    // A subject is something we import from RJXS and is used similarily to the EventEmitter
    activatedEmitter = new Subject<boolean>();
    //The recommended way is to use subjects, do not use event emitters
    //When using Output() we still need to use the event emitters

}