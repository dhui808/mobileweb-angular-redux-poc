import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import { EAccountActions, AccountsReq, AccountsLoaded, AccountDetailsReq, AccountDetailsLoaded } from '../actions/account.actions';
import { IAccountDetails } from '../../models/account-details.interface';

import { AccountService } from '../../services/account.service'

import {Update} from '@ngrx/entity';
import { AddAccountClasses } from '../actions/account-class.actions';
import { IAccountClass } from '../../models/account-class.interface';

@Injectable()
export class AccountEffects {
  @Effect()
  loadAccounts$ = this._actions$.pipe(
    ofType<AccountsReq>(EAccountActions.AccountsReq),
    switchMap(() => {
        return this._accountService.loadAccounts()
          .pipe(
            map((response) => response.body),
            switchMap((result) => {
                console.log(result);
                //loadAccounts failure is handled by interceptor
                if (result && result['exception']) {
                    return of() //otherwise, it throws error "You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
                }
                this._store.dispatch(new AccountsLoaded({ accounts: result.response.accounts }));
                
                //account className
                const accountClasses = result.response.accounts.map(account =>{
                    return {accountKey: account.accountKey, accountClass: 'account-1'} 
                })
                
                const selectedAccountKey = result.response.accounts[0].accountKey
                accountClasses[0].accountClass = 'account-1-selected'
                this._store.dispatch(new AddAccountClasses({accountClasses: accountClasses, selectedAccountKey: selectedAccountKey}));
                
                return of()
          })
          );
      })
  );

  @Effect()
  loadAccountDetails$ = this._actions$.pipe(
    ofType<AccountDetailsReq>(EAccountActions.AccountDetailsReq),
    map(action => action.payload),
    switchMap(payload => {
        return this._accountService.loadAccountDetails(payload)
          .pipe(
            map((response) => response.body),
            switchMap((result) => {
                console.log(result);
                //loadAccountDetails failure is handled by interceptor
                if (result && result['exception']) {
                    return of() //otherwise, it throws error "You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
                }
                
                this._store.dispatch(new AccountDetailsLoaded(result.response.account));
                return of()
          })
          );
      })
  );
  
  constructor(
    private _accountService: AccountService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
