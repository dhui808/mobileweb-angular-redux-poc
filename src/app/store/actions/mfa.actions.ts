import { Action } from '@ngrx/store';

import { ILoginToAccount } from '../../models/login-to-account.interface';
import { IMfaAnswerReq } from '../../models/mfa.interface';

export enum EMfaActions {
  MfaQuestion = '[MfaQuestion] MfaQuestion',
  MfaAnswerReq = '[MfaAnswerReq] MfaAnswerReq',
  MfaToAccountRes = '[MfaToAccountRes] MfaToAccountRes',
}

export class MfaQuestion implements Action {
  public readonly type = EMfaActions.MfaQuestion;
  constructor(public payload: string) {}
}

export class MfaAnswerReq implements Action {
  public readonly type = EMfaActions.MfaAnswerReq;
  constructor(public payload: IMfaAnswerReq) {}
}

export class MfaToAccountRes implements Action {
  public readonly type = EMfaActions.MfaToAccountRes;
  constructor(public payload: ILoginToAccount) {}
}

export type MfaActions = MfaQuestion | MfaAnswerReq | MfaToAccountRes;
