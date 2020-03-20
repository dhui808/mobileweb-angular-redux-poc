import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, empty } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import { ELoginActions, LoginReq } from '../actions/login.actions';

import { LoginService } from '../../services/login.service';

@Injectable()
export class LoginEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<LoginReq>(ELoginActions.LoginReq),
    map((action) => action.payload),
    switchMap((payload) => {
        return this._loginService.logIn(payload.userId, payload.password)
          .pipe(
            map((response) => response.body),
            switchMap((result) => {
                console.log("In LoginEffects, result=" + result);
                //login failure is handled by interceptor
                if (result && result['exception']) {
                    return of() //otherwise, it throws error "You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
                }
                if (!result || !result.context || !result.context.next || result.context.next.length === 0) {
                    return this.router.navigate(['/accounts']);
                }
                return of()
          })
          );
      })
  );

  constructor(
    private _loginService: LoginService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
