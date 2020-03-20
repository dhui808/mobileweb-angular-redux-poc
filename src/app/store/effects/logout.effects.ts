import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import { ELogoutActions, LogoutReq, LogoutAction } from '../actions/logout.actions';

import { LogoutService } from '../../services/logout.service';

@Injectable()
export class LogoutEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<LogoutReq>(ELogoutActions.LogoutReq),
    switchMap(() => {
        return this._logoutService.logout()
          .pipe(
            map((response) => response.body),
            switchMap((result) => {
                console.log("In LogoutEffects, result=" + result);
                this._store.dispatch(new LogoutAction());
                return of()
          })
          );
      })
  );

  constructor(
    private _logoutService: LogoutService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
