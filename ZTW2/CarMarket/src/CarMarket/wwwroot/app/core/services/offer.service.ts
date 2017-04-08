import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Offer } from '../domain/offer';
import { User } from '../domain/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfferService {

    private _offerAPI: string = 'api/offer/';
    _baseUrl: string = '';

   constructor(public offerService: DataService) { }
    /*constructor(public http: Http) {

    }*/
    register(newOffer: Offer) {

        this.offerService.set(this._offerAPI);

        return this.offerService.post(JSON.stringify(newOffer));
    }

   /* register(body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this._offerAPI, body, options) // ...using post request
            .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }*/
    /*register(newOffer: Offer) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._baseUrl + 'offers/', JSON.stringify(newOffer), {
            headers: headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }*/
}
