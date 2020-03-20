import BaseService from './base.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MfaService extends BaseService {
    
  constructor(http: HttpClient) {super(http);}

  submitMfaAnswer(question: string, answer: string): Observable<any> {
    const url = 'MFA'
    return this.post(url, {question, answer})
  }
}

