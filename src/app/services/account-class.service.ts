import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import {IAppState} from '../store/state/app.state'
import { Store, select } from '@ngrx/store';
import { UpdateAccountClasses } from '../store/actions/account-class.actions';
import { selectSelectedAccountKey } from '../store/selectors/account-class.selector';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountClassService {
  
  currentSelectedAccountKey$ = this._store.pipe(select(selectSelectedAccountKey))
    
  constructor(private _store: Store<IAppState>) {}

  updateAccountClasses(accountKey): Observable<any> {
      return this.currentSelectedAccountKey$.pipe(
             map(currentSelectedAccountKey => {
                 return {selectedAccountKey: accountKey, 
                         accountClasses: [{accountKey: currentSelectedAccountKey, accountClass: 'account-1'},
                                          {accountKey: accountKey, accountClass: 'account-1-selected'}
                                         ] 
                 }
             })
      )
  }
}

