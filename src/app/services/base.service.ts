import BankingBase from '../base/BankingBase'
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export default abstract class BaseService {
    
    private BASE_URL = environment.baseUrl
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(protected http: HttpClient) {}
    
    post(path, body): Observable<any> {
        var url = BankingBase.restProxy.getRequestUrl(path)
        url = `${this.BASE_URL}${url}`;
        let options = {headers: this.headers, withCredentials : true, observe: 'response' as 'response'}
        
        return this.http.post(url, body, options)
    }
}