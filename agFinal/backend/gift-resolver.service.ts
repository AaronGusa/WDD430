import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Gifts } from "./models/gift.js";

interface GiftServer {
    message: string;
    Gifts: any;
}

@Injectable()
export class GiftResolver implements Resolve<any>{
    constructor(private _http: HttpClient) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<any> | Promise<any> | GiftServer {
            return this._http.get('http://localhost:5000/gifts');
    }
}