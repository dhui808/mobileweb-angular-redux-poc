import BaseService from './base.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService extends BaseService {
    
  constructor(http: HttpClient) {super(http);}

  logIn(userId: string, password: string): Observable<any> {
    const url = 'LOGIN'
    return this.post(url, {userId, password})
  }
}

