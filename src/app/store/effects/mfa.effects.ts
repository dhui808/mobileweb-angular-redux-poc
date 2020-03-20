import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import { EMfaActions, MfaAnswerReq } from '../actions/mfa.actions';

import { MfaService } from '../../services/mfa.service';

@Injectable()
export class MfaEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<MfaAnswerReq>(EMfaActions.MfaAnswerReq),
    map(action => action.payload),
    switchMap(payload => {
        return this._mfaService.submitMfaAnswer(payload.question, payload.answer)
          .pipe(
            map((response) => response.body),
            switchMap((result) => {
                console.log(result);
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
    private _mfaService: MfaService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<IAppState>
  ) {}
}
