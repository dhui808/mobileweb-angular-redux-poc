import BaseService from './base.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LogoutService extends BaseService {
    
  constructor(http: HttpClient) {super(http);}

  logout(): Observable<any> {
    const url = 'LOGOUT'
    return this.post(url, null)
  }
}

