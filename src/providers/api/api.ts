import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {
baseURL : string;
	constructor(public http: Http) {
    	this.baseURL = "http://donsgiovannis.com/apis/";
  	}

	get(url) {
		var furl = this.baseURL+url;
    	return this.http.get(furl).map(res => res.json());
	}
	
	post(url,postParams) {
		var furl = this.baseURL+url;

		var headers = new Headers();
	    headers.append("Accept", 'application/json');
	    headers.append('Content-Type', 'application/json' );
	    let options = new RequestOptions({ headers: headers });
	   
    	return this.http.post(furl, postParams, options).map(res => res.json());
	}
}
