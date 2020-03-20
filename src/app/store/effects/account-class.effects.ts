import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom, take } from 'rxjs/operators';
import {Update} from '@ngrx/entity';

import { IAppState } from '../state/app.state';
import { EAccountClassActions, AccountSelected, UpdateAccountClasses } from '../actions/account-class.actions';
import { IAccountClass } from '../../models/account-class.interface';

import { AccountClassService } from '../../services/account-class.service';

@Injectable()
export class AccountClassEffects {
  @Effect()
  loadAccounts$ = this._actions$.pipe(
    ofType<AccountSelected>(EAccountClassActions.AccountSelected),
    map((action) => action.payload),
    switchMap(payload => {
        return this._accountClassService.updateAccountClasses(payload)
          .pipe(take(1),
           switchMap(result => {
              const updateAccountClasses: Update<IAccountClass>[] = result.accountClasses.map(ac => {
                  return {
                    id: ac.accountKey,
                    changes: ac
                  };
              });
              
              console.log(updateAccountClasses);
              this._store.dispatch(new UpdateAccountClasses({accountClasses: updateAccountClasses, selectedAccountKey: result.selectedAccountKey}));
              return of()
          })
    )
    })
    )
  
  constructor(
    private _accountClassService: AccountClassService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
