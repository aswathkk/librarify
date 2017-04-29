import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { API_BASE_URL } from '../globals';

@Injectable()
export class AuthService {

  constructor(private http: Http) {
    console.log(API_BASE_URL);
  }

  signup(data) {
    const url = `${API_BASE_URL}/user/`;
    return this.http.post(url, data)
      .map(res => res.json())
      .toPromise();
  }

  login(data) {
    const url = `${API_BASE_URL}/user/login`;
    return this.http.post(url, data)
      .map(res => res.json())
      .toPromise();
  }

  reset(data) {
    const url = `${API_BASE_URL}/user/reset`;
    return this.http.post(url, data)
      .map(res => res.json())
      .toPromise();
  }

}
