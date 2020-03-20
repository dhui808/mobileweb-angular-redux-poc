import BaseService from './base.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccountService extends BaseService {
    
  constructor(http: HttpClient) {super(http);}

  loadAccounts(): Observable<any> {
    const url = 'ACCOUNT_SUMMARY'
    return this.post(url, null)
  }
  
  loadAccountDetails(accountKey): Observable<any> {
      const url = 'ACCOUNT_DETAILS'
      return this.post(url, {accountKey})
    }
}

