// export class LogginService { // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR
//     logStatusChange(status: string) { // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR
//         console.log('A server status changed, new status: ' + status) // THIS IS NOT THE WAY TO USE A SERVICE IN ANGULAR
//     }
// }

//A SERVICE IS JUST A NORMAL TYPESCRIPT CLASS
//
import { Injectable } from '@angular/core';
@Injectable()
export class LogginService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status)
    }
}